import {
  AddedDraft,
  Draft,
  DraftValue,
  NameDraft,
  addedChangesIn,
  buildDefaults,
  buildDraft,
  changedRowIds,
  hasErrors as draftHasErrors,
  newAddedItem,
  same,
  serialize,
} from "@/features/admin/components/PriceEditor/model";
import { AddedRow, ServiceRow } from "@/features/admin/components/PriceEditor/rows";
import {
  AdminCard,
  GhostButton,
  PrimaryButton,
  adminColors,
  bodyFont,
  headingFont,
} from "@/features/admin/ui";
import {
  PriceList,
  PriceRow,
  PriceSection,
  collectPriceLists,
  collectPriceRows,
  defaultPriceCatalog,
  normalizePriceSettings,
} from "@/features/prices/catalog";
import { courses as courseBlocks } from "@/features/courses/constants/courses";
import { endosphereDiscounts } from "@/features/prices/constants/endosphere";
import { db } from "@/lib/firebase";
import { PRICES_DOC } from "@/lib/priceOverrides";
import { Add, CheckCircle, ErrorOutline, ExpandMore, Search } from "@mui/icons-material";
import { Box, CircularProgress, InputBase, Typography, alpha } from "@mui/material";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { TFunction } from "i18next";
import { Fragment, ReactNode, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export type PriceEditorView = "services" | "courses";

// Navigation entries of the "Послуги" tab. Laser is split per laser type; a
// list belongs to an entry when its id starts with the entry key.
type ServiceEntry = {
  key: string;
  section: PriceSection;
  title: string;
  group?: string;
  // Labels already shown in the card heading, left out of the group titles
  hiddenLabels: string[];
};

const SERVICE_ENTRIES: ServiceEntry[] = [
  ...defaultPriceCatalog.lazerEpilation.map((type, i) => ({
    key: `lazerEpilation.${i}`,
    section: "lazerEpilation" as const,
    title: type.lazerType,
    group: "services.lazer",
    hiddenLabels: ["services.lazer", type.lazerType],
  })),
  { key: "electroepilation", section: "electroepilation", title: "services.electroepilation", hiddenLabels: [] },
  { key: "waxing", section: "waxing", title: "services.waxing", hiddenLabels: [] },
  { key: "endosphere", section: "endosphere", title: "services.endosphere", hiddenLabels: [] },
];

const belongsTo = (id: string, entryKey: string) => id === entryKey || id.startsWith(`${entryKey}.`);
const groupAnchor = (listId: string) => `price-group-${listId.replace(/\./g, "-")}`;

const columnLabels = (section: PriceSection, length: number, t: TFunction) => {
  if (length === 1) return ["Ціна"];
  if (section === "waxing") return [t("general.women"), t("general.men")];
  if (section === "electroepilation")
    return [t("electroepilation.expertMaster"), t("electroepilation.master")];
  if (section === "endosphere") return endosphereDiscounts.map((d) => t(d.label));
  return Array.from({ length }, (_, i) => `Ціна ${i + 1}`);
};

function PriceEditor({ email, view }: { email: string; view: PriceEditorView }) {
  const { t } = useTranslation();
  const rows = useMemo(() => collectPriceRows(defaultPriceCatalog), []);
  const lists = useMemo(() => collectPriceLists(defaultPriceCatalog), []);
  const rowsById = useMemo(() => new Map(rows.map((r) => [r.id, r])), [rows]);
  const defaults = useMemo(() => buildDefaults(rows), [rows]);

  const [draft, setDraft] = useState<Draft | null>(null);
  const [saved, setSaved] = useState<Draft | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(SERVICE_ENTRIES[0].key);
  const [activeCourseGroup, setActiveCourseGroup] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  // Added services that came from Firestore on load (others are new this session)
  const [loadedAddedKeys, setLoadedAddedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    getDoc(doc(db, PRICES_DOC.collection, PRICES_DOC.id))
      .then((snap) => {
        const raw = snap.data()?.data;
        const settings = normalizePriceSettings(raw ? JSON.parse(raw) : null);
        const initial = buildDraft(rows, lists, defaults, settings);
        setLoadedAddedKeys(
          new Set(Object.values(initial.added).flatMap((items) => items.map((i) => i.key)))
        );
        setDraft(initial);
        setSaved(initial);
      })
      .catch(() => setLoadError(true));
  }, [rows, lists, defaults]);

  useEffect(() => setQuery(""), [view]);

  // The "saved" confirmation hides by itself; errors stay until the next action
  useEffect(() => {
    if (status?.type !== "success") return;
    const timer = setTimeout(() => setStatus(null), 4000);
    return () => clearTimeout(timer);
  }, [status]);

  if (loadError) {
    return (
      <AdminCard sx={{ display: "flex", gap: 1.5, alignItems: "center", color: adminColors.error }}>
        <ErrorOutline />
        <Typography sx={{ fontFamily: bodyFont }}>Не вдалося завантажити ціни. Оновіть сторінку.</Typography>
      </AdminCard>
    );
  }

  if (!draft || !saved) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress sx={{ color: adminColors.camel }} />
      </Box>
    );
  }

  const changedRows = changedRowIds(draft, saved, rows);
  const changeCount =
    changedRows.size + lists.reduce((sum, list) => sum + addedChangesIn(draft, saved, list.id), 0);
  const hasErrors = draftHasErrors(draft, rows, lists);
  const entryChanges = (entryKey: string) =>
    rows.filter((r) => belongsTo(r.id, entryKey) && changedRows.has(r.id)).length +
    lists
      .filter((l) => belongsTo(l.id, entryKey))
      .reduce((sum, l) => sum + addedChangesIn(draft, saved, l.id), 0);

  const update = (fn: (prev: Draft) => Draft) => {
    setStatus(null);
    setDraft((prev) => (prev ? fn(prev) : prev));
  };
  const setValue = (id: string, value: DraftValue) =>
    update((d) => ({ ...d, values: { ...d.values, [id]: value } }));
  const setName = (id: string, name: NameDraft) =>
    update((d) => ({ ...d, names: { ...d.names, [id]: name } }));
  const setHidden = (id: string, hidden: boolean) =>
    update((d) => ({ ...d, hidden: { ...d.hidden, [id]: hidden } }));
  const setAdded = (listId: string, fn: (items: AddedDraft[]) => AddedDraft[]) =>
    update((d) => ({ ...d, added: { ...d.added, [listId]: fn(d.added[listId] ?? []) } }));

  const save = async () => {
    setSaving(true);
    setStatus(null);
    try {
      await setDoc(doc(db, PRICES_DOC.collection, PRICES_DOC.id), {
        data: JSON.stringify(serialize(draft, defaults, rows, lists)),
        updatedAt: serverTimestamp(),
        updatedBy: email,
      });
      setSaved(draft);
      setStatus({ type: "success", text: "Збережено. На сайті — протягом кількох хвилин." });
    } catch {
      setStatus({ type: "error", text: "Не вдалося зберегти. Спробуйте ще раз." });
    } finally {
      setSaving(false);
    }
  };

  const search = query.trim().toLowerCase();
  const rowName = (row: PriceRow) => draft.names[row.id]?.ua || defaults.names[row.id]?.ua || "";
  const matches = (text: string) => !search || text.toLowerCase().includes(search);

  // Group title without what the card heading already says
  const groupTitle = (labels: string[], hidden: string[]) =>
    labels.filter((l) => !hidden.includes(l)).map((l) => t(l)).join(" · ");

  const renderList = (list: PriceList, entry: ServiceEntry) => {
    const title = groupTitle(list.labels, [entry.title, ...entry.hiddenLabels]);
    const listRows = list.rowIds.map((id) => rowsById.get(id)!);
    const added = draft.added[list.id] ?? [];
    const savedAdded = saved.added[list.id] ?? [];
    const visibleRows = listRows.filter((r) => matches(`${title} ${rowName(r)}`));
    const visibleAdded = added.filter((item) => matches(`${title} ${item.ua}`));
    if (search && visibleRows.length + visibleAdded.length === 0) return null;
    const columns = columnLabels(list.section, list.priceCount, t);

    return (
      <Box key={list.id} id={groupAnchor(list.id)} sx={{ mt: 4, scrollMarginTop: "110px" }}>
        {title && <GroupTitle>{title}</GroupTitle>}
        {visibleRows.map((row) => (
          <ServiceRow
            key={row.id}
            value={draft.values[row.id]}
            defaultValue={defaults.values[row.id]}
            name={draft.names[row.id]}
            defaultName={defaults.names[row.id]}
            hidden={!!draft.hidden[row.id]}
            unsaved={changedRows.has(row.id)}
            columns={columns}
            canEditName
            onValue={(v) => setValue(row.id, v)}
            onName={(n) => setName(row.id, n)}
            onHidden={(h) => setHidden(row.id, h)}
          />
        ))}
        {visibleAdded.map((item) => (
          <AddedRow
            key={item.key}
            list={list}
            item={item}
            columns={columns}
            unsaved={!same(item, savedAdded.find((s) => s.key === item.key))}
            isNew={!loadedAddedKeys.has(item.key)}
            onChange={(next) =>
              setAdded(list.id, (items) => items.map((i) => (i.key === item.key ? next : i)))
            }
            onRemove={() => setAdded(list.id, (items) => items.filter((i) => i.key !== item.key))}
          />
        ))}
        {!search && (
          <GhostButton
            startIcon={<Add fontSize="small" />}
            onClick={() => setAdded(list.id, (items) => [...items, newAddedItem(list)])}
            sx={{ mt: 1, ml: { xs: 0.5, sm: 1 }, color: adminColors.camel }}
          >
            Додати послугу{title ? ` у «${title.split(" · ").pop()}»` : ""}
          </GhostButton>
        )}
      </Box>
    );
  };

  // Accordion tree for the services sidebar: laser folds into its laser types,
  // the other sections into their groups (anchors inside the section card)
  const servicesNavNodes = (): ServicesNavNode[] => {
    const laser = SERVICE_ENTRIES.filter((e) => e.group);
    const nodes: ServicesNavNode[] = [];
    if (laser.length > 0) {
      nodes.push({
        id: laser[0].group!,
        title: t(laser[0].group!),
        children: laser.map((e) => {
          // One anchor per first-level group (gender) of this laser type
          const anchors: ServicesNavAnchor[] = [];
          for (const list of lists.filter((l) => belongsTo(l.id, e.key))) {
            const title = groupTitle(list.labels, [e.title, ...e.hiddenLabels]).split(" · ")[0];
            const listCount =
              list.rowIds.filter((id) => changedRows.has(id)).length + addedChangesIn(draft, saved, list.id);
            const existing = anchors.find((a) => a.title === title);
            if (existing) existing.count += listCount;
            else if (title) anchors.push({ id: list.id, title, anchor: groupAnchor(list.id), count: listCount });
          }
          return {
            id: e.key,
            title: t(e.title),
            entryKey: e.key,
            count: entryChanges(e.key),
            anchors: anchors.length > 1 ? anchors : undefined,
          };
        }),
      });
    }
    for (const entry of SERVICE_ENTRIES.filter((e) => !e.group)) {
      const entryLists = lists.filter((l) => belongsTo(l.id, entry.key));
      const titled = entryLists
        .map((l) => ({ list: l, title: groupTitle(l.labels, [entry.title, ...entry.hiddenLabels]) }))
        .filter(({ title }) => title);
      nodes.push({
        id: entry.key,
        title: t(entry.title),
        entryKey: entry.key,
        count: entryChanges(entry.key),
        children:
          titled.length > 1
            ? titled.map(({ list, title }) => ({
                id: list.id,
                title,
                entryKey: entry.key,
                anchor: groupAnchor(list.id),
                count:
                  list.rowIds.filter((id) => changedRows.has(id)).length +
                  addedChangesIn(draft, saved, list.id),
              }))
            : undefined,
      });
    }
    return nodes;
  };

  const servicesView = () => {
    const entries = search
      ? SERVICE_ENTRIES
      : SERVICE_ENTRIES.filter((e) => e.key === activeSection);
    const cards = entries
      .map((entry) => {
        const content = lists
          .filter((l) => belongsTo(l.id, entry.key))
          .map((l) => renderList(l, entry))
          .filter(Boolean);
        if (content.length === 0) return null;
        return (
          <AdminCard key={entry.key} sx={{ mb: 2.5, p: { xs: 1, sm: 3 } }}>
            {entry.group && (
              <Typography
                sx={{
                  fontFamily: bodyFont,
                  fontSize: "12px",
                  color: adminColors.latte,
                  px: { xs: 1.5, sm: 2 },
                  pt: { xs: 1, sm: 0 },
                  mb: 0.5,
                }}
              >
                {t(entry.group)}
              </Typography>
            )}
            <SectionTitle>{t(entry.title)}</SectionTitle>
            {content}
          </AdminCard>
        );
      })
      .filter(Boolean);

    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "240px 1fr" },
          gap: 3,
          alignItems: "start",
        }}
      >
        <ServicesNav
          active={search ? null : activeSection}
          nodes={servicesNavNodes()}
          onSelect={(entryKey, anchor) => {
            setQuery("");
            setActiveSection(entryKey);
            if (anchor) {
              // Wait for the selected card to render, then bring the group into view
              setTimeout(
                () => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth", block: "start" }),
                50
              );
            }
          }}
        />
        <Box sx={{ minWidth: 0 }}>
          <SearchBox query={query} onChange={setQuery} placeholder="Пошук: бікіні, пахви, ендосфера…" />
          {cards.length > 0 ? cards : <NothingFound query={query} />}
        </Box>
      </Box>
    );
  };

  const coursesView = () => {
    // Courses grouped exactly like the site's course list: a course listed in
    // several blocks (online consultation) shows up — as the same row — in each
    const rowByLink = new Map(
      rows
        .filter((r) => r.section === "courses")
        .map((r) => [defaultPriceCatalog.courses[r.path[1] as number].link, r])
    );
    const allGroups = new Map<string, { title: string; items: { row: PriceRow; name: string }[] }>();
    for (const block of courseBlocks) {
      const items = block.variants
        .map((variant) => ({ row: rowByLink.get(variant.link?.replace(/^\//, "") ?? ""), name: t(variant.title) }))
        .filter((item): item is { row: PriceRow; name: string } => !!item.row);
      if (items.length > 0) allGroups.set(block.title, { title: t(block.title), items });
    }
    // Courses that have a page but aren't in the list still get a place
    const listed = new Set(Array.from(allGroups.values()).flatMap((g) => g.items.map((i) => i.row.id)));
    const unlisted = Array.from(rowByLink.values()).filter((r) => !listed.has(r.id));
    if (unlisted.length > 0) {
      allGroups.set("other", {
        title: "Інші курси",
        items: unlisted.map((row) => ({ row, name: t(row.labels[row.labels.length - 1] ?? "") })),
      });
    }
    const groupKeys = Array.from(allGroups.keys());
    const current = activeCourseGroup && allGroups.has(activeCourseGroup) ? activeCourseGroup : groupKeys[0];
    const visible = groupKeys
      .filter((key) => search || key === current)
      .map((key) => {
        const group = allGroups.get(key)!;
        return { key, ...group, items: group.items.filter(({ name }) => matches(`${group.title} ${name}`)) };
      })
      .filter((group) => group.items.length > 0);

    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "240px 1fr" },
          gap: 3,
          alignItems: "start",
        }}
      >
        <SectionNav
          label="Групи курсів"
          items={groupKeys.map((key) => ({ key, title: allGroups.get(key)!.title }))}
          active={search ? null : current}
          counts={(key) => allGroups.get(key)!.items.filter(({ row }) => changedRows.has(row.id)).length}
          onSelect={(key) => {
            setQuery("");
            setActiveCourseGroup(key);
          }}
        />
        <Box sx={{ minWidth: 0 }}>
          <SearchBox query={query} onChange={setQuery} placeholder="Пошук курсу…" />
          {visible.length === 0 ? (
            <NothingFound query={query} />
          ) : (
            visible.map((group) => (
              <AdminCard key={group.key} sx={{ mb: 2.5, p: { xs: 1, sm: 3 } }}>
                <SectionTitle>{group.title}</SectionTitle>
                <Typography
                  sx={{
                    fontFamily: bodyFont,
                    fontSize: "13px",
                    lineHeight: 1.7,
                    color: adminColors.latte,
                    px: { xs: 1.5, sm: 2 },
                    mb: 2,
                  }}
                >
                  Вартість показується на сторінці курсу так, як ви її напишете. Залиште поле порожнім — і
                  ціну не буде показано.
                </Typography>
                {group.items.map(({ row, name }) => (
                  <ServiceRow
                    key={row.id}
                    value={draft.values[row.id]}
                    defaultValue={defaults.values[row.id]}
                    defaultName={{ ua: name, en: name }}
                    hidden={false}
                    unsaved={changedRows.has(row.id)}
                    columns={[]}
                    canEditName={false}
                    emptyAllowedPlaceholder="Ціну не вказано"
                    onValue={(v) => setValue(row.id, v)}
                    onName={() => {}}
                    onHidden={() => {}}
                  />
                ))}
              </AdminCard>
            ))
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ pb: 14 }}>
      {view === "services" ? servicesView() : coursesView()}

      {/* Floating save bar */}
      {(changeCount > 0 || status) && (
        <Box
          role="status"
          sx={{
            position: "fixed",
            left: "50%",
            bottom: { xs: 12, sm: 24 },
            transform: "translateX(-50%)",
            zIndex: 1200,
            width: "min(640px, calc(100% - 24px))",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            flexWrap: "wrap",
            backgroundColor: adminColors.chocolate,
            color: "#fff",
            borderRadius: { xs: "20px", sm: "999px" },
            pl: 2.5,
            pr: 1,
            py: 1,
            boxShadow: "0 12px 40px rgba(53, 48, 45, 0.35)",
          }}
        >
          <Box
            sx={{ flex: "1 1 180px", display: "flex", alignItems: "center", gap: 1, minWidth: 0, py: 0.5 }}
          >
            {hasErrors || status?.type === "error" ? (
              <ErrorOutline sx={{ color: "#F2B8B5" }} fontSize="small" />
            ) : status?.type === "success" && changeCount === 0 ? (
              <CheckCircle sx={{ color: adminColors.gold }} fontSize="small" />
            ) : null}
            <Typography sx={{ fontFamily: bodyFont, fontSize: "13px", color: "#fff" }}>
              {hasErrors
                ? "Заповніть поля, виділені червоним"
                : status?.type === "error"
                  ? status.text
                  : changeCount > 0
                    ? `Незбережених змін: ${changeCount}`
                    : status?.text}
            </Typography>
          </Box>
          {changeCount > 0 && (
            <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
              <GhostButton
                onClick={() => {
                  setDraft(saved);
                  setStatus(null);
                }}
                sx={{ color: "#fff", "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" } }}
              >
                Скасувати
              </GhostButton>
              <PrimaryButton
                onClick={save}
                disabled={saving || hasErrors}
                sx={{
                  backgroundColor: adminColors.gold,
                  color: adminColors.chocolate,
                  "&:hover": { backgroundColor: "#e6d6b9" },
                }}
              >
                {saving ? "Зберігаю…" : "Зберегти"}
              </PrimaryButton>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <Typography
    component="h2"
    sx={{
      fontFamily: headingFont,
      fontSize: { xs: "20px", sm: "24px" },
      lineHeight: 1.3,
      color: adminColors.chocolate,
      px: { xs: 1.5, sm: 2 },
      pt: { xs: 1, sm: 0 },
      mb: 1.5,
    }}
  >
    {children}
  </Typography>
);

const GroupTitle = ({ children }: { children: ReactNode }) => (
  <Typography
    sx={{
      fontFamily: bodyFont,
      fontSize: "13px",
      fontWeight: 700,
      letterSpacing: "0.04em",
      lineHeight: 1.5,
      textTransform: "uppercase",
      color: adminColors.chocolate,
      backgroundColor: adminColors.beige,
      borderLeft: `4px solid ${adminColors.camel}`,
      borderRadius: "12px",
      px: 2,
      py: 1.25,
      mb: 1.5,
    }}
  >
    {children}
  </Typography>
);

const SearchBox = ({
  query,
  onChange,
  placeholder,
}: {
  query: string;
  onChange: (q: string) => void;
  placeholder: string;
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1,
      backgroundColor: "#fff",
      borderRadius: "999px",
      pl: 2,
      pr: 1,
      py: 0.75,
      mb: 2.5,
      boxShadow: "0 4px 20px rgba(53, 48, 45, 0.05)",
    }}
  >
    <Search sx={{ color: adminColors.latte }} />
    <InputBase
      fullWidth
      placeholder={placeholder}
      value={query}
      onChange={(e) => onChange(e.target.value)}
      inputProps={{ "aria-label": "Пошук" }}
      sx={{ fontFamily: bodyFont, fontSize: "14px", color: adminColors.chocolate }}
    />
    {query && (
      <GhostButton size="small" onClick={() => onChange("")}>
        Очистити
      </GhostButton>
    )}
  </Box>
);

const NothingFound = ({ query }: { query: string }) => (
  <AdminCard sx={{ textAlign: "center" }}>
    <Typography sx={{ fontFamily: bodyFont, color: adminColors.latte }}>
      Нічого не знайдено за запитом «{query}»
    </Typography>
  </AdminCard>
);

type NavItem<K extends string> = { key: K; title: string; group?: string };

const NavButton = ({
  title,
  count,
  active,
  nested,
  onClick,
}: {
  title: string;
  count: number;
  active: boolean;
  nested?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => (
  <Box
    component="button"
    aria-current={active ? "true" : undefined}
    onClick={onClick}
    sx={{
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 1,
      border: 0,
      cursor: "pointer",
      textAlign: "left",
      borderRadius: "999px",
      px: 2,
      py: 1.25,
      ml: { md: nested ? 2 : 0 },
      fontFamily: bodyFont,
      fontSize: "13px",
      lineHeight: 1.4,
      whiteSpace: { xs: "nowrap", md: "normal" },
      color: active ? "#fff" : adminColors.chocolate,
      backgroundColor: active ? adminColors.chocolate : { xs: "#fff", md: "transparent" },
      transition: "background-color .2s",
      "&:hover": { backgroundColor: active ? adminColors.chocolate : alpha(adminColors.gold, 0.35) },
    }}
  >
    {title}
    {count > 0 && (
      <Box
        component="span"
        sx={{
          minWidth: 20,
          height: 20,
          px: 0.75,
          borderRadius: "999px",
          fontSize: "11px",
          lineHeight: "20px",
          textAlign: "center",
          backgroundColor: active ? adminColors.gold : adminColors.camel,
          color: active ? adminColors.chocolate : "#fff",
        }}
      >
        {count}
      </Box>
    )}
  </Box>
);

type ServicesNavAnchor = { id: string; title: string; anchor: string; count: number };
type ServicesNavChild = {
  id: string;
  title: string;
  entryKey: string;
  anchor?: string;
  count: number;
  // Third level, shown under the selected child (laser type → Жіноча / Чоловіча)
  anchors?: ServicesNavAnchor[];
};
type ServicesNavNode = {
  id: string;
  title: string;
  entryKey?: string;
  count?: number;
  children?: ServicesNavChild[];
};

const CountBadge = ({ count, inverted }: { count: number; inverted?: boolean }) =>
  count > 0 ? (
    <Box
      component="span"
      sx={{
        flexShrink: 0,
        minWidth: 20,
        height: 20,
        px: 0.75,
        borderRadius: "999px",
        fontSize: "11px",
        lineHeight: "20px",
        textAlign: "center",
        backgroundColor: inverted ? adminColors.gold : adminColors.camel,
        color: inverted ? adminColors.chocolate : "#fff",
      }}
    >
      {count}
    </Box>
  ) : null;

// Desktop: accordion sidebar. Mobile: strip of chips with one chip per card.
const ServicesNav = ({
  nodes,
  active,
  onSelect,
}: {
  nodes: ServicesNavNode[];
  active: string | null;
  onSelect: (entryKey: string, anchor?: string) => void;
}) => {
  const activeNode = nodes.find(
    (n) => n.entryKey === active || n.children?.some((c) => c.entryKey === active)
  )?.id;
  const [open, setOpen] = useState<Set<string>>(() => new Set(activeNode ? [activeNode] : []));
  const isOpen = (id: string) => open.has(id);
  const toggle = (id: string, force?: boolean) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (force ?? !next.has(id)) next.add(id);
      else next.delete(id);
      return next;
    });

  // Chips for mobile: laser types are cards of their own, other sections are one card each
  const chips = nodes.flatMap((n) =>
    n.entryKey
      ? [{ key: n.entryKey, title: n.title, count: n.count ?? 0 }]
      : (n.children ?? []).map((c) => ({ key: c.entryKey, title: c.title, count: c.count }))
  );

  return (
    <>
      <Box
        component="nav"
        aria-label="Розділи послуг"
        sx={{
          display: { xs: "flex", md: "none" },
          gap: 0.75,
          overflowX: "auto",
          minWidth: 0,
          pb: 0.5,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {chips.map((chip) => (
          <NavButton
            key={chip.key}
            title={chip.title}
            count={chip.count}
            active={chip.key === active}
            onClick={(e) => {
              onSelect(chip.key);
              e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
            }}
          />
        ))}
      </Box>

      <Box
        component="nav"
        aria-label="Розділи послуг"
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          gap: 0.5,
          position: "sticky",
          top: 104,
        }}
      >
        {nodes.map((node) => {
          const expanded = !!node.children && isOpen(node.id);
          const nodeActive = node.id === activeNode;
          const total = node.count ?? (node.children ?? []).reduce((sum, c) => sum + c.count, 0);
          return (
            <Box key={node.id}>
              <Box
                component="button"
                aria-expanded={node.children ? expanded : undefined}
                aria-current={node.entryKey && node.entryKey === active ? "true" : undefined}
                onClick={() => {
                  if (node.entryKey) {
                    onSelect(node.entryKey);
                    if (node.children) toggle(node.id, node.entryKey !== active ? true : undefined);
                  } else {
                    toggle(node.id);
                    if (!expanded && node.children?.[0] && !nodeActive) onSelect(node.children[0].entryKey);
                  }
                }}
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  border: 0,
                  cursor: "pointer",
                  textAlign: "left",
                  borderRadius: "999px",
                  px: 2,
                  py: 1.25,
                  fontFamily: bodyFont,
                  fontSize: "13px",
                  fontWeight: 700,
                  lineHeight: 1.4,
                  color: nodeActive && !node.children ? "#fff" : adminColors.chocolate,
                  backgroundColor: nodeActive
                    ? node.children
                      ? alpha(adminColors.gold, 0.45)
                      : adminColors.chocolate
                    : "transparent",
                  transition: "background-color .2s",
                  "&:hover": {
                    backgroundColor:
                      nodeActive && !node.children ? adminColors.chocolate : alpha(adminColors.gold, 0.45),
                  },
                }}
              >
                <Box component="span" sx={{ flex: 1 }}>
                  {node.title}
                </Box>
                {(!expanded || !node.children) && (
                  <CountBadge count={total} inverted={nodeActive && !node.children} />
                )}
                {node.children && (
                  <ExpandMore
                    fontSize="small"
                    sx={{ transition: "transform .2s", transform: expanded ? "rotate(180deg)" : "none" }}
                  />
                )}
              </Box>

              {expanded && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.25,
                    ml: 2,
                    mt: 0.5,
                    mb: 1,
                    pl: 1,
                    borderLeft: `2px solid ${adminColors.caramel}`,
                  }}
                >
                  {node.children!.map((child) => {
                    // Laser types are whole cards; other children are groups inside a card
                    const childActive = !child.anchor && child.entryKey === active;
                    return (
                      <Fragment key={child.id}>
                      <Box
                        component="button"
                        aria-current={childActive ? "true" : undefined}
                        onClick={() => onSelect(child.entryKey, child.anchor)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          border: 0,
                          cursor: "pointer",
                          textAlign: "left",
                          borderRadius: "999px",
                          px: 1.75,
                          py: 1,
                          fontFamily: bodyFont,
                          fontSize: "13px",
                          lineHeight: 1.4,
                          color: childActive ? "#fff" : adminColors.chocolate,
                          backgroundColor: childActive ? adminColors.chocolate : "transparent",
                          transition: "background-color .2s",
                          "&:hover": {
                            backgroundColor: childActive ? adminColors.chocolate : alpha(adminColors.gold, 0.35),
                          },
                        }}
                      >
                        <Box component="span" sx={{ flex: 1 }}>
                          {child.title}
                        </Box>
                        <CountBadge count={child.count} inverted={childActive} />
                      </Box>
                      {childActive &&
                        child.anchors?.map((anchor) => (
                          <Box
                            key={anchor.id}
                            component="button"
                            onClick={() => onSelect(child.entryKey, anchor.anchor)}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              border: 0,
                              cursor: "pointer",
                              textAlign: "left",
                              borderRadius: "999px",
                              ml: 2,
                              px: 1.75,
                              py: 0.75,
                              fontFamily: bodyFont,
                              fontSize: "12px",
                              lineHeight: 1.4,
                              color: adminColors.latte,
                              backgroundColor: "transparent",
                              "&::before": {
                                content: '""',
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                backgroundColor: adminColors.gold,
                                flexShrink: 0,
                              },
                              "&:hover": { backgroundColor: alpha(adminColors.gold, 0.35), color: adminColors.chocolate },
                            }}
                          >
                            <Box component="span" sx={{ flex: 1 }}>
                              {anchor.title}
                            </Box>
                            <CountBadge count={anchor.count} />
                          </Box>
                        ))}
                      </Fragment>
                    );
                  })}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </>
  );
};

// Sidebar on desktop (items sharing a `group` fold into an accordion),
// a horizontal strip of chips on mobile
const SectionNav = <K extends string>({
  label,
  items,
  active,
  counts,
  onSelect,
}: {
  label: string;
  items: NavItem<K>[];
  active: K | null;
  counts: (key: K) => number;
  onSelect: (key: K) => void;
}) => {
  const activeGroup = items.find((i) => i.key === active)?.group;
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set(items.filter((i) => i.group).map((i) => i.group!).slice(0, 1))
  );
  const isOpen = (group: string) => openGroups.has(group) || group === activeGroup;
  const toggle = (group: string) =>
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (isOpen(group)) next.delete(group);
      else next.add(group);
      return next;
    });

  const select = (key: K) => (e: React.MouseEvent<HTMLButtonElement>) => {
    onSelect(key);
    // On mobile the sections are a horizontal strip: keep the chosen one visible
    e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <Box
      component="nav"
      aria-label={label}
      sx={{
        position: { md: "sticky" },
        top: { md: 24 },
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        gap: 0.75,
        overflowX: { xs: "auto", md: "visible" },
        minWidth: 0,
        pb: { xs: 0.5, md: 0 },
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {items.map(({ key, title, group }, index) => {
        const startsGroup = !!group && group !== items[index - 1]?.group;
        const groupCount = group
          ? items.filter((i) => i.group === group).reduce((sum, i) => sum + counts(i.key), 0)
          : 0;
        return (
          <Fragment key={key}>
            {startsGroup && (
              <Box
                component="button"
                aria-expanded={isOpen(group!)}
                onClick={() => toggle(group!)}
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  gap: 1,
                  border: 0,
                  cursor: "pointer",
                  textAlign: "left",
                  borderRadius: "999px",
                  px: 2,
                  py: 1.25,
                  fontFamily: bodyFont,
                  fontSize: "13px",
                  fontWeight: 700,
                  color: adminColors.chocolate,
                  backgroundColor: group === activeGroup ? alpha(adminColors.gold, 0.35) : "transparent",
                  "&:hover": { backgroundColor: alpha(adminColors.gold, 0.35) },
                }}
              >
                <Box component="span" sx={{ flex: 1 }}>
                  {group}
                </Box>
                {!isOpen(group!) && groupCount > 0 && (
                  <Box
                    component="span"
                    sx={{
                      minWidth: 20,
                      height: 20,
                      px: 0.75,
                      borderRadius: "999px",
                      fontSize: "11px",
                      lineHeight: "20px",
                      textAlign: "center",
                      backgroundColor: adminColors.camel,
                      color: "#fff",
                    }}
                  >
                    {groupCount}
                  </Box>
                )}
                <ExpandMore
                  fontSize="small"
                  sx={{ transition: "transform .2s", transform: isOpen(group!) ? "rotate(180deg)" : "none" }}
                />
              </Box>
            )}
            <Box
              sx={{
                display: { xs: "flex", md: !group || isOpen(group) ? "flex" : "none" },
                flexDirection: "column",
              }}
            >
              <NavButton
                title={title}
                count={counts(key)}
                active={key === active}
                nested={!!group}
                onClick={select(key)}
              />
            </Box>
          </Fragment>
        );
      })}
    </Box>
  );
};

export default PriceEditor;
