"use client";

import { usePrices } from "@/context/PricesContext";
import { PriceTabs } from "@/features/prices/components/PriceTable";
import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LaserComplex from "../LaserComplex";
import LaserZone from "../Zones";

// Laser type and gender are switched with tabs instead of nested accordions
function LaserEpilation() {
  const { t } = useTranslation();
  const { lazerEpilation } = usePrices();
  const [typeIndex, setTypeIndex] = useState(0);
  const [groupIndex, setGroupIndex] = useState(0);

  const type = lazerEpilation[Math.min(typeIndex, lazerEpilation.length - 1)];
  if (!type) return null;
  const group = type.info[Math.min(groupIndex, type.info.length - 1)];

  return (
    <Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 2, alignItems: "flex-start" }}>
        <PriceTabs
          label={t("services.lazer")}
          options={lazerEpilation.map((item, i) => ({ value: i, title: t(item.lazerType) }))}
          value={typeIndex}
          onChange={(i) => {
            setTypeIndex(i);
            setGroupIndex(0);
          }}
        />
        {type.info.length > 1 && (
          <PriceTabs
            label={t("services.gender.women")}
            options={type.info.map((item, i) => ({ value: i, title: t(item.gender) }))}
            value={groupIndex}
            onChange={setGroupIndex}
          />
        )}
      </Box>

      {group && (
        <>
          {group.complexes && group.complexes.length > 0 && <LaserComplex complexes={group.complexes} />}
          <LaserZone zones={group.zones} />
        </>
      )}
    </Box>
  );
}

export default LaserEpilation;
