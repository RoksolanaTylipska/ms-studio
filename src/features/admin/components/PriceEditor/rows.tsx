import {
  AddedDraft,
  DraftValue,
  NameDraft,
  addedItemErrors,
  extraFieldIsNumber,
  isDigits,
  same,
  translateIn,
} from "@/features/admin/components/PriceEditor/model";
import {
  GhostButton,
  IconAction,
  PriceInput,
  TextInput,
  adminColors,
  bodyFont,
} from "@/features/admin/ui";
import { PriceList } from "@/features/prices/catalog";
import { DeleteOutline, EditOutlined, Restore, Undo } from "@mui/icons-material";
import { Box, Tooltip, Typography, alpha } from "@mui/material";
import { ReactNode, useState } from "react";

const formatValue = (value: DraftValue) =>
  typeof value === "string" ? value || "не вказано" : value.map((v) => `${v} ₴`).join(" / ");

const RowShell = ({
  highlight,
  muted,
  children,
}: {
  highlight: boolean;
  muted?: boolean;
  children: ReactNode;
}) => (
  <Box
    sx={{
      px: { xs: 1.5, sm: 2 },
      py: 1.5,
      borderRadius: "16px",
      borderLeft: `3px solid ${highlight ? adminColors.camel : "transparent"}`,
      backgroundColor: highlight ? alpha(adminColors.gold, 0.25) : "transparent",
      opacity: muted ? 0.75 : 1,
      transition: "background-color .2s",
      "&:hover": { backgroundColor: highlight ? alpha(adminColors.gold, 0.3) : adminColors.beige },
    }}
  >
    {children}
  </Box>
);

const Hint = ({ children, color = adminColors.latte }: { children: ReactNode; color?: string }) => (
  <Typography sx={{ fontFamily: bodyFont, fontSize: "11px", color, mt: 0.25 }}>{children}</Typography>
);

const Action = ({ title, onClick, disabled, children }: { title: string; onClick: () => void; disabled?: boolean; children: ReactNode }) => (
  <Tooltip title={title}>
    <span>
      <IconAction aria-label={title} onClick={onClick} disabled={disabled}>
        {children}
      </IconAction>
    </span>
  </Tooltip>
);

const PriceFields = ({
  name,
  value,
  columns,
  onChange,
  emptyAllowedPlaceholder,
}: {
  name: string;
  value: DraftValue;
  columns: string[];
  onChange: (value: string, index?: number) => void;
  emptyAllowedPlaceholder?: string;
}) =>
  typeof value === "string" ? (
    <Box sx={{ width: { xs: "100%", md: 420 } }}>
      <TextInput
        ariaLabel={`${name} — вартість`}
        value={value}
        placeholder={emptyAllowedPlaceholder}
        onChange={(v) => onChange(v)}
      />
    </Box>
  ) : (
    <>
      {value.map((v, i) => (
        <PriceInput
          key={i}
          label={columns[i]}
          ariaLabel={`${name} — ${columns[i]}`}
          value={v}
          error={!isDigits(v)}
          onChange={(next) => onChange(next, i)}
        />
      ))}
    </>
  );

const NameFields = ({
  name,
  onChange,
  errorUa,
  errorEn,
  autoFocus,
}: {
  name: NameDraft;
  onChange: (name: NameDraft) => void;
  errorUa?: boolean;
  errorEn?: boolean;
  autoFocus?: boolean;
}) => (
  <Box sx={{ display: "flex", gap: 1.5, flexWrap: { xs: "wrap", sm: "nowrap" }, width: "100%" }}>
    <Box sx={{ flex: "1 1 220px" }}>
      <TextInput
        label="Назва українською"
        ariaLabel="Назва українською"
        value={name.ua}
        error={errorUa}
        autoFocus={autoFocus}
        onChange={(ua) => onChange({ ...name, ua })}
      />
    </Box>
    <Box sx={{ flex: "1 1 220px" }}>
      <TextInput
        label="Назва англійською"
        ariaLabel="Назва англійською"
        value={name.en}
        error={errorEn}
        onChange={(en) => onChange({ ...name, en })}
      />
    </Box>
  </Box>
);

const rowGrid = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr auto", md: "minmax(140px, 1fr) auto auto" },
  alignItems: "center",
  columnGap: 1.5,
  rowGap: 1,
} as const;

const fieldsCell = {
  gridColumn: { xs: "1 / -1", md: "auto" },
  gridRow: { xs: 2, md: "auto" },
  display: "flex",
  // Prices sit in one row where there is room for them
  flexWrap: { xs: "wrap", lg: "nowrap" },
  gap: 1.5,
  justifyContent: { md: "flex-end" },
} as const;

const actionsCell = {
  gridColumn: { xs: 2, md: 3 },
  gridRow: 1,
  display: "flex",
  justifySelf: "end",
} as const;

export const ServiceRow = ({
  value,
  defaultValue,
  name,
  defaultName,
  hidden,
  unsaved,
  columns,
  canEditName,
  emptyAllowedPlaceholder,
  onValue,
  onName,
  onHidden,
}: {
  value: DraftValue;
  defaultValue: DraftValue;
  name?: NameDraft;
  defaultName: NameDraft;
  hidden: boolean;
  unsaved: boolean;
  columns: string[];
  canEditName: boolean;
  emptyAllowedPlaceholder?: string;
  onValue: (value: DraftValue) => void;
  onName: (name: NameDraft) => void;
  onHidden: (hidden: boolean) => void;
}) => {
  const [editingName, setEditingName] = useState(false);
  const shownName = name?.ua || defaultName.ua;
  const renamed = !!name && !same(name, defaultName);
  const customPrice = !same(value, defaultValue);

  const updateValue = (next: string, index?: number) =>
    onValue(
      index === undefined || typeof value === "string"
        ? next
        : value.map((v, i) => (i === index ? next : v))
    );

  if (hidden) {
    return (
      <RowShell highlight={unsaved} muted>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontFamily: bodyFont, fontSize: "14px", color: adminColors.latte, textDecoration: "line-through" }}>
              {shownName}
            </Typography>
            <Hint>Прихована — на сайті не показується</Hint>
          </Box>
          <GhostButton startIcon={<Undo fontSize="small" />} onClick={() => onHidden(false)}>
            Повернути
          </GhostButton>
        </Box>
      </RowShell>
    );
  }

  return (
    <RowShell highlight={unsaved}>
      <Box sx={rowGrid}>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontFamily: bodyFont, fontSize: "14px", color: adminColors.chocolate }}>
            {shownName}
          </Typography>
          {renamed && <Hint>Стандартна назва: {defaultName.ua}</Hint>}
          {customPrice && <Hint>Стандартна ціна: {formatValue(defaultValue)}</Hint>}
        </Box>

        <Box sx={fieldsCell}>
          <PriceFields
            name={shownName}
            value={value}
            columns={columns}
            onChange={updateValue}
            emptyAllowedPlaceholder={emptyAllowedPlaceholder}
          />
        </Box>

        <Box sx={actionsCell}>
          {canEditName && (
            <Action title="Змінити назву" onClick={() => setEditingName((v) => !v)}>
              <EditOutlined fontSize="small" />
            </Action>
          )}
          <Action title="Повернути стандартну ціну" onClick={() => onValue(defaultValue)} disabled={!customPrice}>
            <Restore fontSize="small" />
          </Action>
          {canEditName && (
            <Action title="Прибрати послугу з сайту" onClick={() => onHidden(true)}>
              <DeleteOutline fontSize="small" />
            </Action>
          )}
        </Box>
      </Box>

      {canEditName && editingName && name && (
        <Box sx={{ mt: 1.5, display: "flex", flexDirection: "column", gap: 1 }}>
          <NameFields
            name={name}
            onChange={onName}
            errorUa={!name.ua.trim()}
            errorEn={!name.en.trim()}
            autoFocus
          />
          <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
            {renamed && (
              <GhostButton onClick={() => onName(defaultName)}>Стандартна назва</GhostButton>
            )}
            <GhostButton onClick={() => setEditingName(false)} sx={{ border: `1px solid ${adminColors.caramel}` }}>
              Готово
            </GhostButton>
          </Box>
        </Box>
      )}
    </RowShell>
  );
};

const extraLabel = (list: PriceList, key: string) => {
  if (key === "time") return extraFieldIsNumber(list, key) ? "Час, хв" : "Час";
  if (key === "type") return "Тип (напр. MINI)";
  return key;
};

const ExtraFields = ({
  list,
  item,
  errors,
  onChange,
}: {
  list: PriceList;
  item: AddedDraft;
  errors: Record<string, boolean>;
  onChange: (item: AddedDraft) => void;
}) => (
  <>
    {list.extraFields.map(({ key, example }) => (
      <Box key={key} sx={{ width: { xs: "calc(50% - 6px)", sm: 160 } }}>
        <TextInput
          label={extraLabel(list, key)}
          ariaLabel={extraLabel(list, key)}
          value={item.extra[key] ?? ""}
          placeholder={typeof example === "string" ? translateIn(example, "ua") : String(example)}
          error={errors[key]}
          onChange={(v) => onChange({ ...item, extra: { ...item.extra, [key]: v } })}
        />
      </Box>
    ))}
  </>
);

// A service added in /admin. Until the page is reloaded it stays an open form
// ("Нова послуга"); once it comes back from Firestore it looks like any other row.
export const AddedRow = ({
  list,
  item,
  columns,
  unsaved,
  isNew,
  onChange,
  onRemove,
}: {
  list: PriceList;
  item: AddedDraft;
  columns: string[];
  unsaved: boolean;
  isNew: boolean;
  onChange: (item: AddedDraft) => void;
  onRemove: () => void;
}) => {
  const errors = addedItemErrors(list, item);
  const hasError = errors.name || errors.nameEn || Object.values(errors.extra).some(Boolean);
  const [editing, setEditing] = useState(false);
  const priceInputs = item.value.map((v, i) => (
    <PriceInput
      key={i}
      label={columns[i]}
      ariaLabel={`${item.ua || "Нова послуга"} — ${columns[i]}`}
      value={v}
      error={errors.value[i]}
      onChange={(next) =>
        onChange({ ...item, value: item.value.map((old, j) => (j === i ? next : old)) })
      }
    />
  ));

  if (!isNew) {
    return (
      <RowShell highlight={unsaved}>
        <Box sx={rowGrid}>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontFamily: bodyFont, fontSize: "14px", color: adminColors.chocolate }}>
              {item.ua}
            </Typography>
          </Box>
          <Box sx={fieldsCell}>{priceInputs}</Box>
          <Box sx={actionsCell}>
            <Action title="Змінити назву" onClick={() => setEditing((v) => !v)}>
              <EditOutlined fontSize="small" />
            </Action>
            {/* No default price to restore: keep the columns aligned with other rows */}
            <Box sx={{ width: 36, flexShrink: 0 }} />
            <Action title="Прибрати послугу з сайту" onClick={onRemove}>
              <DeleteOutline fontSize="small" />
            </Action>
          </Box>
        </Box>

        {(editing || hasError) && (
          <Box sx={{ mt: 1.5, display: "flex", flexDirection: "column", gap: 1.5 }}>
            <NameFields
              name={{ ua: item.ua, en: item.en }}
              onChange={(name) => onChange({ ...item, ...name })}
              errorUa={errors.name}
              errorEn={errors.nameEn}
              autoFocus
            />
            {list.extraFields.length > 0 && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                <ExtraFields list={list} item={item} errors={errors.extra} onChange={onChange} />
              </Box>
            )}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <GhostButton
                onClick={() => setEditing(false)}
                sx={{ border: `1px solid ${adminColors.caramel}` }}
              >
                Готово
              </GhostButton>
            </Box>
          </Box>
        )}
      </RowShell>
    );
  }

  return (
    <RowShell highlight={unsaved}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
        <Box
          component="span"
          sx={{
            fontFamily: bodyFont,
            fontSize: "11px",
            borderRadius: "999px",
            px: 1.25,
            py: 0.25,
            backgroundColor: adminColors.camel,
            color: "#fff",
          }}
        >
          Нова послуга
        </Box>
        <Box sx={{ flex: 1 }} />
        <Action title="Видалити нову послугу" onClick={onRemove}>
          <DeleteOutline fontSize="small" />
        </Action>
      </Box>

      <NameFields
        name={{ ua: item.ua, en: item.en }}
        onChange={(name) => onChange({ ...item, ...name })}
        errorUa={errors.name}
        errorEn={errors.nameEn}
        autoFocus={!item.ua}
      />

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 1.5, alignItems: "flex-end" }}>
        <ExtraFields list={list} item={item} errors={errors.extra} onChange={onChange} />
        {priceInputs}
      </Box>
    </RowShell>
  );
};
