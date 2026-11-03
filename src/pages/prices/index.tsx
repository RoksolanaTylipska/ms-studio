import PricesClientSide from "@/features/prices/PricesPageClientSide";
import { Seo } from "@/components/Seo";

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
