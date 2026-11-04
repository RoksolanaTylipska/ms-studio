import PricesClientSide from "@/features/prices/PricesPageClientSide";
import { JsonLd } from "@/components/JsonLd";
import { Seo } from "@/components/Seo";
import { PriceSettings, applyPriceSettings } from "@/features/prices/catalog";
import { pricesPageSchema } from "@/features/servicePages/seo";
import { fetchPriceSettings } from "@/lib/priceOverrides";
import { GetStaticProps } from "next";

function PricesPage({ priceSettings }: { priceSettings: PriceSettings }) {
  return (
    <>
      <Seo
        title="Ціни на лазерну епіляцію та електроепіляцію у Львові | MS STUDIO LASER"
        description="Актуальні ціни на лазерну епіляцію, електроепіляцію, воскову депіляцію, шугаринг та ендосферу у Львові. Комплекси зон та вигідні пропозиції в MS STUDIO LASER."
        path="/prices"
      />
      <JsonLd id="prices-schema" data={pricesPageSchema(applyPriceSettings(priceSettings).catalog)} />
      <PricesClientSide />
    </>
  );
}

export default PricesPage;

export const getStaticProps: GetStaticProps = async () => ({
  props: { priceSettings: await fetchPriceSettings() },
  // Prices edited in /admin show up on the site within a minute
  revalidate: 60,
});
