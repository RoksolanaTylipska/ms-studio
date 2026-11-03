"use client";

import { usePrices } from "@/context/PricesContext";
import { PriceGroup } from "@/features/prices/components/PriceTable";
import { endosphereDiscounts } from "@/features/prices/constants/endosphere";
import { useTranslation } from "react-i18next";

function Endosphere() {
  const { t } = useTranslation();
  const { endosphere } = usePrices();

  return (
    <PriceGroup
      columns={endosphereDiscounts.map(({ label, sessions }) =>
        // Session count on the first line, its discount on the second
        sessions ? `${t(label)}\n${t(sessions)}` : t(label)
      )}
      rows={endosphere.map((zone) => ({
        label: t(zone.name),
        sub: t(zone.time),
        cells: zone.prices,
      }))}
    />
  );
}

export default Endosphere;
