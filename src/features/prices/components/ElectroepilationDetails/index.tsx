"use client";

import { usePrices } from "@/context/PricesContext";
import { PriceGroup, PriceNote, priceColors } from "@/features/prices/components/PriceTable";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { CARD_RADIUS } from "@/styles/card";

function ElectroepilationDetails() {
  const { t } = useTranslation();
  const { electroepilation } = usePrices();

  return (
    <Box>
      {/* Trial session: highlighted above the price list */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          mb: 2,
          px: { xs: 2, sm: 3 },
          py: 1.5,
          borderRadius: CARD_RADIUS,
          backgroundColor: priceColors.gold,
        }}
      >
        <Typography
          variant="inherit"
          sx={{ fontFamily: "Comfortaa, sans-serif", fontSize: { xs: "13px", sm: "15px" }, fontWeight: 700, color: priceColors.chocolate }}
        >
          {t("electroepilation.trial")} · {t("electroepilation.trialTime").trim()}
        </Typography>
        <Typography
          variant="inherit"
          sx={{ fontFamily: "Comfortaa, sans-serif", fontSize: { xs: "13px", sm: "14px" }, color: priceColors.chocolate }}
        >
          {t("electroepilation.trialPrice")}
        </Typography>
      </Box>

      {electroepilation.map((item, i) => (
        <PriceGroup
          key={i}
          title={t(item.masterQnt)}
          columns={item.values.map((value) => t(value))}
          rows={item.variants.map((variant) => ({
            label: t(variant.label),
            cells: [`${variant.time} ${t("general.min")}`, ...variant.price],
          }))}
        />
      ))}

      <Box sx={{ px: { xs: 1, sm: 1.5 }, display: "flex", flexDirection: "column", gap: 0.5 }}>
        <PriceNote>{t("electroepilation.billedSeparately")}:</PriceNote>
        <PriceNote>• {t("electroepilation.needle")}</PriceNote>
        <PriceNote>• {t("electroepilation.anesthesia")}</PriceNote>
      </Box>
    </Box>
  );
}

export default ElectroepilationDetails;
