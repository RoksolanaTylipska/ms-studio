import i18n from "@/I18n/i18nConfig";
import {
  PriceList,
  PriceRow,
  PriceSettings,
  PriceValue,
  emptyPriceSettings,
} from "@/features/prices/catalog";

// While editing, numbers are kept as strings so a field can be temporarily empty
export type DraftValue = string[] | string;
export type NameDraft = { ua: string; en: string };
export type AddedDraft = {
  key: string;
  ua: string;
  en: string;
  value: string[];
  extra: Record<string, string>;
};
export type Draft = {
  values: Record<string, DraftValue>;
  names: Record<string, NameDraft>;
  hidden: Record<string, boolean>;
  added: Record<string, AddedDraft[]>;
};

export const translateIn = (key: string, lng: "ua" | "en") =>
  i18n.t(key, { lng, defaultValue: key });

// Course prices may be translation keys; the editor works with the visible text
export const toDraftValue = (value: PriceValue): DraftValue =>
  typeof value === "string" ? translateIn(value, "ua") : value.map(String);

export const defaultName = (row: PriceRow): NameDraft => {
  const key = row.labels[row.labels.length - 1] ?? "";
  return { ua: translateIn(key, "ua"), en: translateIn(key, "en") };
};

export const isDigits = (v: string) => /^\d+$/.test(v.trim());
const isValidValue = (value: DraftValue) =>
  typeof value === "string" ? true : value.every(isDigits);

export const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

export const buildDefaults = (rows: PriceRow[]): Draft => ({
  values: Object.fromEntries(rows.map((r) => [r.id, toDraftValue(r.value)])),
  names: Object.fromEntries(rows.filter((r) => r.labelKey).map((r) => [r.id, defaultName(r)])),
  hidden: {},
  added: {},
});

export const buildDraft = (
  rows: PriceRow[],
  lists: PriceList[],
  defaults: Draft,
  settings: PriceSettings
): Draft => {
  const draft: Draft = { values: { ...defaults.values }, names: { ...defaults.names }, hidden: {}, added: {} };

  for (const row of rows) {
    const price = settings.prices[row.id];
    if (price?.sig === row.sig && typeof price.value === typeof row.value) {
      draft.values[row.id] = toDraftValue(price.value);
    }
    const name = settings.names[row.id];
    if (row.labelKey && name?.sig === row.sig) draft.names[row.id] = { ua: name.ua, en: name.en };
    if (row.labelKey && settings.hidden[row.id] === row.sig) draft.hidden[row.id] = true;
  }

  for (const list of lists) {
    const entry = settings.added[list.id];
    if (entry?.sig !== list.sig) continue;
    draft.added[list.id] = entry.items.map((item) => ({
      key: item.key,
      ua: item.ua,
      en: item.en,
      value: item.value.map(String),
      extra: Object.fromEntries(
        list.extraFields.map(({ key, example }) => [key, String(item.extra?.[key] ?? example)])
      ),
    }));
  }
  return draft;
};

export const newAddedItem = (list: PriceList): AddedDraft => ({
  key: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
  ua: "",
  en: "",
  value: Array.from({ length: list.priceCount }, () => ""),
  extra: Object.fromEntries(list.extraFields.map(({ key }) => [key, ""])),
});

export const extraFieldIsNumber = (list: PriceList, key: string) =>
  typeof list.extraFields.find((f) => f.key === key)?.example === "number";

export const addedItemErrors = (list: PriceList, item: AddedDraft) => ({
  name: !item.ua.trim(),
  nameEn: !item.en.trim(),
  value: item.value.map((v) => !isDigits(v)),
  extra: Object.fromEntries(
    Object.entries(item.extra).map(([key, v]) => [
      key,
      extraFieldIsNumber(list, key) ? !isDigits(v) : !v.trim(),
    ])
  ),
});

export const hasErrors = (draft: Draft, rows: PriceRow[], lists: PriceList[]) =>
  rows.some(
    (r) =>
      !draft.hidden[r.id] &&
      (!isValidValue(draft.values[r.id]) ||
        (r.labelKey && (!draft.names[r.id]?.ua.trim() || !draft.names[r.id]?.en.trim())))
  ) ||
  lists.some((list) =>
    (draft.added[list.id] ?? []).some((item) => {
      const e = addedItemErrors(list, item);
      return e.name || e.nameEn || e.value.some(Boolean) || Object.values(e.extra).some(Boolean);
    })
  );

export const rowChanged = (a: Draft, b: Draft, id: string) =>
  !same(a.values[id], b.values[id]) || !same(a.names[id], b.names[id]) || !!a.hidden[id] !== !!b.hidden[id];

export const changedRowIds = (draft: Draft, saved: Draft, rows: PriceRow[]) =>
  new Set(rows.filter((r) => rowChanged(draft, saved, r.id)).map((r) => r.id));

// Number of added items that are new, edited or deleted compared to `saved`
export const addedChangesIn = (draft: Draft, saved: Draft, listId: string) => {
  const now = draft.added[listId] ?? [];
  const before = saved.added[listId] ?? [];
  const edited = now.filter((item) => !same(item, before.find((b) => b.key === item.key))).length;
  const removed = before.filter((b) => !now.some((item) => item.key === b.key)).length;
  return edited + removed;
};

// Store only what differs from the defaults in the code
export const serialize = (
  draft: Draft,
  defaults: Draft,
  rows: PriceRow[],
  lists: PriceList[]
): PriceSettings => {
  const settings = emptyPriceSettings();

  for (const row of rows) {
    const value = draft.values[row.id];
    if (!same(value, defaults.values[row.id])) {
      settings.prices[row.id] = {
        sig: row.sig,
        value: typeof value === "string" ? value.trim() : value.map((v) => Number(v)),
      };
    }
    if (!row.labelKey) continue;
    const name = draft.names[row.id];
    if (!same(name, defaults.names[row.id])) {
      settings.names[row.id] = { sig: row.sig, ua: name.ua.trim(), en: name.en.trim() };
    }
    if (draft.hidden[row.id]) settings.hidden[row.id] = row.sig;
  }

  for (const list of lists) {
    const items = draft.added[list.id] ?? [];
    if (items.length === 0) continue;
    settings.added[list.id] = {
      sig: list.sig,
      items: items.map((item) => ({
        key: item.key,
        ua: item.ua.trim(),
        en: item.en.trim(),
        value: item.value.map((v) => Number(v)),
        extra: Object.fromEntries(
          Object.entries(item.extra).map(([key, v]) => [
            key,
            extraFieldIsNumber(list, key) ? Number(v) : v.trim(),
          ])
        ),
      })),
    };
  }
  return settings;
};
