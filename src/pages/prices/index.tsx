import PricesClientSide from "@/features/prices/PricesPageClientSide";
import { Seo } from "@/components/Seo";
import { fetchPriceSettings } from "@/lib/priceOverrides";
import { GetStaticProps } from "next";

function PricesPage() {
  return (
    <>
      <Seo
        title="Ціни на лазерну епіляцію та електроепіляцію у Львові | MS Laser"
        description="Актуальні ціни на лазерну епіляцію, електроепіляцію, воскову депіляцію, шугаринг та ендосферу у Львові. Комплекси зон та вигідні пропозиції в MS Laser."
        path="/prices"
      />
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
