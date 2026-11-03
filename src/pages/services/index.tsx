import ServicesList from "@/features/services/components/ServicesList";
import Intro from "@/features/services/components/Intro";
import { Seo } from "@/components/Seo";

function Services() {
  return (
    <>
      <Seo
        title="Послуги: лазерна епіляція, електроепіляція, депіляція | MS Laser Львів"
        description="Лазерна епіляція, електроепіляція, воскова депіляція, шугаринг та ендосфера-терапія у Львові. Підберемо метод під ваш тип шкіри та волосся."
        path="/services"
      />
      <Intro />
      <ServicesList />
    </>
  );
}

export default Services;
