import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import { CARD_RADIUS } from "@/styles/card";

// Shared building blocks of the price list: every service renders its prices
// as white cards with aligned columns so the whole list reads the same way.

export const priceColors = {
  chocolate: "#35302D",
  camel: "#83694E",
  latte: "#7B7167",
  gold: "#D9C6A4",
  caramel: "#E0D6D0",
  beige: "#F1EAE5",
};
const bodyFont = "Comfortaa, sans-serif";

export type PriceRowData = {
  label: string;
  sub?: string;
  // Numbers are shown as "N ₴"; 0 means "not offered"; strings are shown as is
  cells: (number | string)[];
};

// Wide enough for captions like "6 сеансів · 10% знижки" on one or two lines
const COLUMN_WIDTH = { xs: 64, sm: 110, md: 130 };

const formatCell = (cell: number | string) =>
  typeof cell === "number" ? (cell > 0 ? `${cell} ₴` : "—") : cell;

const Cell = ({ children, head }: { children: ReactNode; head?: boolean }) => (
  <Box
    sx={{
      width: COLUMN_WIDTH,
      flexShrink: 0,
      textAlign: "right",
      fontFamily: bodyFont,
      fontVariantNumeric: "tabular-nums",
      // Captions may carry an explicit line break ("6 сеансів\n10% знижки")
      whiteSpace: head ? "pre-line" : "nowrap",
      fontSize: head ? { xs: "11px", sm: "12px" } : { xs: "14px", sm: "16px" },
      fontWeight: head ? 400 : 700,
      lineHeight: 1.3,
      color: head ? priceColors.latte : priceColors.chocolate,
    }}
  >
    {children}
  </Box>
);

export const PriceGroup = ({
  title,
  columns = [],
  rows,
}: {
  title?: string;
  // Column captions shown above the prices (empty string = no caption)
  columns?: string[];
  rows: PriceRowData[];
}) => {
  const hasCaptions = columns.some(Boolean);
  // With 3+ price columns a phone has no room left for the name: put the
  // prices on their own line under it, still aligned under the captions
  const stacked = Math.max(columns.length, ...rows.map((r) => r.cells.length)) >= 3;

  return (
    <Box
      sx={{
        backgroundColor: priceColors.beige,
        borderRadius: CARD_RADIUS,
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 1.5, sm: 2 },
        mb: 2,
      }}
    >
      {(title || hasCaptions) && (
        <Box
          sx={{
            display: "flex",
            flexWrap: stacked ? { xs: "wrap", sm: "nowrap" } : "nowrap",
            alignItems: "flex-end",
            columnGap: { xs: 1, sm: 2 },
            rowGap: 1,
            pb: 1.25,
            mb: 0.5,
            borderBottom: `1px solid ${priceColors.caramel}`,
          }}
        >
          <Typography
            variant="inherit"
            sx={{
              flex: 1,
              minWidth: 0,
              flexBasis: stacked ? { xs: "100%", sm: 0 } : 0,
              fontFamily: bodyFont,
              fontSize: { xs: "12px", sm: "13px" },
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: priceColors.camel,
            }}
          >
            {title}
          </Typography>
          {hasCaptions && (
            <Box sx={{ display: "flex", gap: { xs: 1, sm: 2 }, ml: "auto" }}>
              {columns.map((caption, i) => (
                <Cell key={i} head>
                  {caption}
                </Cell>
              ))}
            </Box>
          )}
        </Box>
      )}

      {rows.map((row, i) => (
        <Box
          key={`${row.label}-${i}`}
          sx={{
            display: "flex",
            flexWrap: stacked ? { xs: "wrap", sm: "nowrap" } : "nowrap",
            alignItems: "center",
            columnGap: { xs: 1, sm: 2 },
            rowGap: 0.75,
            py: { xs: 1.1, sm: 1.25 },
            borderTop: i === 0 ? "none" : `1px solid ${priceColors.caramel}`,
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0, flexBasis: stacked ? { xs: "100%", sm: 0 } : 0 }}>
            <Typography
              variant="inherit"
              sx={{ fontFamily: bodyFont, fontSize: { xs: "13px", sm: "15px" }, lineHeight: 1.45, color: priceColors.chocolate }}
            >
              {row.label}
            </Typography>
            {row.sub && (
              <Typography
                variant="inherit"
                sx={{ fontFamily: bodyFont, fontSize: { xs: "11px", sm: "12px" }, color: priceColors.latte, mt: 0.25 }}
              >
                {row.sub}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", gap: { xs: 1, sm: 2 }, ml: "auto" }}>
            {row.cells.map((cell, j) => (
              <Cell key={j}>{formatCell(cell)}</Cell>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

// Pill switcher (e.g. Олександрит | Діод, Жінки | Чоловіки)
export const PriceTabs = <K extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: K; title: string }[];
  value: K;
  onChange: (value: K) => void;
}) => (
  <Box
    role="tablist"
    aria-label={label}
    sx={{
      display: "inline-flex",
      flexWrap: "wrap",
      gap: 0.5,
      p: 0.5,
      mb: 2,
      maxWidth: "100%",
      borderRadius: "999px",
      backgroundColor: priceColors.beige,
    }}
  >
    {options.map((option) => {
      const active = option.value === value;
      return (
        <Box
          key={option.value}
          component="button"
          role="tab"
          aria-selected={active}
          onClick={() => onChange(option.value)}
          sx={{
            border: 0,
            cursor: "pointer",
            borderRadius: "999px",
            px: { xs: 2, sm: 2.5 },
            py: 1,
            fontFamily: bodyFont,
            fontSize: { xs: "12px", sm: "13px" },
            lineHeight: 1.3,
            textAlign: "center",
            color: active ? "#fff" : priceColors.chocolate,
            backgroundColor: active ? priceColors.chocolate : "transparent",
            transition: "background-color .2s, color .2s",
          }}
        >
          {option.title}
        </Box>
      );
    })}
  </Box>
);

export const PriceNote = ({ children }: { children: ReactNode }) => (
  <Typography
    variant="inherit"
    sx={{ fontFamily: bodyFont, fontSize: { xs: "12px", sm: "13px" }, lineHeight: 1.6, color: priceColors.latte }}
  >
    {children}
  </Typography>
);
