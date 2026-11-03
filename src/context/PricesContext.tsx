import i18n from "@/I18n/i18nConfig";
import {
  PriceCatalog,
  PriceSettings,
  applyPriceSettings,
  defaultPriceCatalog,
} from "@/features/prices/catalog";
import { ReactNode, createContext, useContext, useMemo } from "react";

const PricesContext = createContext<PriceCatalog>(defaultPriceCatalog);

export const PricesProvider = ({
  settings,
  children,
}: {
  settings?: PriceSettings;
  children: ReactNode;
}) => {
  const catalog = useMemo(() => {
    const { catalog, translations } = applyPriceSettings(settings);
    // Renamed/added services are rendered through t() like the built-in ones
    for (const lng of ["ua", "en"] as const) {
      for (const [key, value] of Object.entries(translations[lng])) {
        i18n.addResource(lng, "translations", key, value);
      }
    }
    return catalog;
  }, [settings]);

  return <PricesContext.Provider value={catalog}>{children}</PricesContext.Provider>;
};

export const usePrices = () => useContext(PricesContext);
