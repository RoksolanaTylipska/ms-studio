"use client";

import { PriceGroup } from "@/features/prices/components/PriceTable";
import { Zone } from "@/features/prices/types/zones";
import { useTranslation } from "react-i18next";

interface ZonesProps {
  zones: Zone[];
  // Captions above the price columns (translation keys), e.g. women / men
  columns?: string[];
}

function Zones({ zones, columns = [] }: ZonesProps) {
  const { t } = useTranslation();

  return (
    <>
      {zones.map((zone, i) => (
        <PriceGroup
          key={i}
          title={t(zone.title)}
          columns={columns.map((c) => t(c))}
          rows={zone.variants.map((variant) => ({ label: t(variant.label), cells: variant.price }))}
        />
      ))}
    </>
  );
}

export default Zones;
