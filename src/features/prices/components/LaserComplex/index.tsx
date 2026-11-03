"use client";

import { priceColors } from "@/features/prices/components/PriceTable";
import { Complex } from "@/features/prices/types/lazerEpilation";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CARD_RADIUS } from "@/styles/card";

interface ComplexProps {
  complexes: Complex[];
}

// Laser packages as cards: package name, duration, included zones and price
function LaserComplex({ complexes }: ComplexProps) {
  const { t } = useTranslation();

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="bodyCaveat" sx={{ display: "block", mb: 1.5, px: 0.5 }}>
        {t("lazerEpilation.payLess")}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: `repeat(${Math.min(complexes.length, 4)}, 1fr)` },
          gap: 1.5,
        }}
      >
        {complexes.map((complex) => (
          <Box
            key={complex.type + complex.name}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              p: 2.5,
              borderRadius: CARD_RADIUS,
              backgroundColor: priceColors.beige,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 1 }}>
              <Typography
                variant="inherit"
                sx={{ fontFamily: "'Playfair Display SC', serif", fontSize: "22px", color: priceColors.chocolate }}
              >
                {complex.type}
              </Typography>
              <Typography
                variant="inherit"
                sx={{ fontFamily: "Comfortaa, sans-serif", fontSize: "12px", color: priceColors.camel, whiteSpace: "nowrap" }}
              >
                {complex.time}
              </Typography>
            </Box>
            <Typography
              variant="inherit"
              sx={{ fontFamily: "Comfortaa, sans-serif", fontSize: "13px", lineHeight: 1.55, color: priceColors.latte, flex: 1 }}
            >
              {t(complex.name)}
            </Typography>
            <Typography
              variant="inherit"
              sx={{
                fontFamily: "Comfortaa, sans-serif",
                fontSize: "20px",
                fontWeight: 700,
                fontVariantNumeric: "tabular-nums",
                color: priceColors.chocolate,
                pt: 1,
                borderTop: `1px solid ${priceColors.caramel}`,
              }}
            >
              {complex.prices.map((price) => `${price} ₴`).join(" / ")}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default LaserComplex;
