import { courseDetails } from "@/features/courses/constants/courseDetails";
import { electroepilation } from "@/features/prices/constants/electroepilation";
import { endosphere } from "@/features/prices/constants/endosphere";
import { eyebrow } from "@/features/prices/constants/eyebrow";
import { lazerEpilation } from "@/features/prices/constants/lazerEpilation";
import { nails } from "@/features/prices/constants/nails";
import { waxing } from "@/features/prices/constants/waxing";

// Services and prices hard-coded in the constants are the defaults. The studio
// edits them in /admin; only the differences are stored in Firestore
// (settings/prices) and applied on top.
export const defaultPriceCatalog = {
  lazerEpilation,
  electroepilation,
  waxing,
  endosphere,
  nails,
  eyebrow,
  courses: courseDetails.map(({ link, title, subTitle, price }) => ({
    link,
    title,
    subTitle,
    // Courses without a price get an empty one so the studio can fill it in
    price: price ?? "",
  })),
};

export type PriceCatalog = typeof defaultPriceCatalog;
export type PriceSection = keyof PriceCatalog;
export type PriceValue = number[] | string;

// Every stored change carries `sig` — the label chain of the row/list it was
// made for. It is applied only while the defaults still have the same labels
// there, so reordering the constants never moves a change to the wrong service.
export type PriceOverrides = Record<string, { sig: string; value: PriceValue }>;
export type NameOverride = { sig: string; ua: string; en: string };
export type AddedItem = {
  key: string;
  ua: string;
  en: string;
  value: number[];
  extra: Record<string, string | number>;
};

export type PriceSettings = {
  version: 2;
  prices: PriceOverrides;
  names: Record<string, NameOverride>;
  hidden: Record<string, string>;
  added: Record<string, { sig: string; items: AddedItem[] }>;
};

export const emptyPriceSettings = (): PriceSettings => ({
  version: 2,
  prices: {},
  names: {},
  hidden: {},
  added: {},
});

// Accepts both the current format and the first one (a bare price-overrides map)
export const normalizePriceSettings = (raw: unknown): PriceSettings => {
  if (!raw || typeof raw !== "object") return emptyPriceSettings();
  const data = raw as Partial<PriceSettings>;
  if (data.version !== 2) return { ...emptyPriceSettings(), prices: raw as PriceOverrides };
  return {
    version: 2,
    prices: data.prices ?? {},
    names: data.names ?? {},
    hidden: data.hidden ?? {},
    added: data.added ?? {},
  };
};

export type PriceRow = {
  id: string;
  section: PriceSection;
  path: (string | number)[];
  labels: string[];
  sig: string;
  value: PriceValue;
  // Service rows (not courses) can be renamed, hidden and added to
  listId?: string;
  labelKey?: "label" | "name";
};

export type PriceList = {
  id: string;
  section: PriceSection;
  path: (string | number)[];
  labels: string[];
  sig: string;
  rowIds: string[];
  labelKey: "label" | "name";
  priceKey: "price" | "prices";
  priceCount: number;
  // Other fields every item of this list has (e.g. time, type) and an example value
  extraFields: { key: string; example: string | number }[];
};

const LABEL_KEYS = ["lazerType", "gender", "masterQnt", "title", "subTitle", "name", "label"];
const PRICE_KEYS = ["price", "prices"] as const;
const ITEM_LABEL_KEYS = ["label", "name"] as const;

const isNumberArray = (value: unknown): value is number[] =>
  Array.isArray(value) && value.length > 0 && value.every((v) => typeof v === "number");

export const collectPriceRows = (catalog: PriceCatalog): PriceRow[] => {
  const rows: PriceRow[] = [];

  const walk = (node: unknown, path: (string | number)[], labels: string[]) => {
    if (Array.isArray(node)) {
      node.forEach((child, i) => walk(child, [...path, i], labels));
      return;
    }
    if (!node || typeof node !== "object") return;

    const record = node as Record<string, unknown>;
    const ownLabels = LABEL_KEYS.map((key) => record[key]).filter(
      (v): v is string => typeof v === "string" && v.length > 0
    );
    const nextLabels = [...labels, ...ownLabels];

    for (const [key, value] of Object.entries(record)) {
      const childPath = [...path, key];
      const isPrice = (PRICE_KEYS as readonly string[]).includes(key);
      if (isPrice && (isNumberArray(value) || typeof value === "string")) {
        const section = path[0] as PriceSection;
        const labelKey = ITEM_LABEL_KEYS.find((k) => typeof record[k] === "string");
        const inList = typeof path[path.length - 1] === "number";
        rows.push({
          id: childPath.join("."),
          section,
          path: childPath,
          labels: nextLabels,
          sig: nextLabels.join("|"),
          value,
          ...(section !== "courses" && inList && labelKey && isNumberArray(value)
            ? { listId: path.slice(0, -1).join("."), labelKey }
            : {}),
        });
      } else if (typeof value === "object") {
        walk(value, childPath, nextLabels);
      }
    }
  };

  for (const section of Object.keys(catalog) as PriceSection[]) {
    walk(catalog[section], [section], []);
  }
  return rows;
};

const getAtPath = (target: unknown, path: (string | number)[]) =>
  path.reduce<unknown>((node, key) => (node as Record<string | number, unknown>)?.[key], target);

export const collectPriceLists = (catalog: PriceCatalog): PriceList[] => {
  const lists = new Map<string, PriceList>();
  for (const row of collectPriceRows(catalog)) {
    if (!row.listId || !row.labelKey) continue;
    const existing = lists.get(row.listId);
    if (existing) {
      existing.rowIds.push(row.id);
      continue;
    }
    const listPath = row.path.slice(0, -2);
    const template = getAtPath(catalog, row.path.slice(0, -1)) as Record<string, unknown>;
    const priceKey = row.path[row.path.length - 1] as "price" | "prices";
    const labels = row.labels.slice(0, -1);
    lists.set(row.listId, {
      id: row.listId,
      section: row.section,
      path: listPath,
      labels,
      sig: labels.join("|"),
      rowIds: [row.id],
      labelKey: row.labelKey,
      priceKey,
      priceCount: (row.value as number[]).length,
      extraFields: Object.entries(template)
        .filter(
          ([key, value]) =>
            key !== row.labelKey &&
            key !== priceKey &&
            // Optional: a new complex must not require a price before the discount
            key !== "oldPrice" &&
            (typeof value === "string" || typeof value === "number")
        )
        .map(([key, example]) => ({ key, example: example as string | number })),
    });
  }
  return Array.from(lists.values());
};

const setAtPath = (target: unknown, path: (string | number)[], value: unknown) => {
  const parent = getAtPath(target, path.slice(0, -1)) as Record<string | number, unknown>;
  parent[path[path.length - 1]] = value;
};

const isValidPrice = (current: PriceValue, next: unknown): next is PriceValue =>
  typeof current === "string"
    ? typeof next === "string"
    : isNumberArray(next) &&
      next.length === current.length &&
      next.every((n) => Number.isFinite(n) && n >= 0);

export const customNameKey = (id: string) => `customNames.${id.replace(/\./g, "_")}`;

export type CustomTranslations = { ua: Record<string, string>; en: Record<string, string> };

// Groups/zones left without any service are dropped so the site never renders
// an empty block (and components that read the first item don't break)
const pruneEmpty = (node: unknown): void => {
  if (Array.isArray(node)) {
    for (let i = node.length - 1; i >= 0; i--) {
      const child = node[i] as Record<string, unknown>;
      pruneEmpty(child);
      if (child && typeof child === "object" && Array.isArray(child.variants) && child.variants.length === 0) {
        node.splice(i, 1);
      }
    }
    return;
  }
  if (!node || typeof node !== "object") return;
  const record = node as Record<string, unknown>;
  for (const [key, value] of Object.entries(record)) {
    pruneEmpty(value);
    if (key === "complexes" && Array.isArray(value) && value.length === 0) delete record[key];
  }
};

export const applyPriceSettings = (
  settings?: PriceSettings | null
): { catalog: PriceCatalog; translations: CustomTranslations } => {
  const translations: CustomTranslations = { ua: {}, en: {} };
  if (!settings) return { catalog: defaultPriceCatalog, translations };

  const { prices, names, hidden, added } = settings;
  if (![prices, names, hidden, added].some((m) => Object.keys(m).length > 0)) {
    return { catalog: defaultPriceCatalog, translations };
  }

  const catalog = structuredClone(defaultPriceCatalog) as PriceCatalog;
  const rows = collectPriceRows(catalog);
  const lists = collectPriceLists(catalog);

  // 1. Prices and names of existing services
  for (const row of rows) {
    const price = prices[row.id];
    if (price && price.sig === row.sig && isValidPrice(row.value, price.value)) {
      setAtPath(catalog, row.path, price.value);
    }
    const name = names[row.id];
    if (name && row.labelKey && name.sig === row.sig && name.ua.trim()) {
      const key = customNameKey(row.id);
      translations.ua[key] = name.ua.trim();
      translations.en[key] = name.en.trim() || name.ua.trim();
      setAtPath(catalog, [...row.path.slice(0, -1), row.labelKey], key);
    }
  }

  // 2. New services, appended to their list (built from the list's first item)
  for (const list of lists) {
    const entry = added[list.id];
    if (!entry || entry.sig !== list.sig) continue;
    const items = getAtPath(catalog, list.path) as Record<string, unknown>[];
    const template = getAtPath(defaultPriceCatalog, [...list.path, 0]) as Record<string, unknown>;
    for (const item of entry.items) {
      if (!item.ua?.trim() || !isNumberArray(item.value) || item.value.length !== list.priceCount) continue;
      const key = customNameKey(`added.${item.key}`);
      translations.ua[key] = item.ua.trim();
      translations.en[key] = item.en?.trim() || item.ua.trim();
      const extra = Object.fromEntries(
        list.extraFields.map(({ key: field, example }) => [field, item.extra?.[field] ?? example])
      );
      items.push({ ...template, ...extra, [list.labelKey]: key, [list.priceKey]: item.value });
    }
  }

  // 3. Hidden services, removed last so the default indices above stay valid
  const toRemove = rows
    .filter((row) => row.listId && hidden[row.id] === row.sig)
    .map((row) => row.path.slice(0, -1))
    .sort((a, b) => (b[b.length - 1] as number) - (a[a.length - 1] as number));
  for (const itemPath of toRemove) {
    const list = getAtPath(catalog, itemPath.slice(0, -1)) as unknown[];
    list.splice(itemPath[itemPath.length - 1] as number, 1);
  }
  pruneEmpty(catalog);

  return { catalog, translations };
};
