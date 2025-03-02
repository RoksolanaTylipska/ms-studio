import Intro from "@/components/Intro";
import ServicesList from "@/components/ServicesList";
import Head from "next/head";

function Services() {

  return (
    <>
      <Head>
        <title>Cтудія лазерної епіляції, електроепіляції, шугарингу та воскової депіляції у Львові
        </title>
        <meta name="description" content="Професійні послуги лазерної епіляції, електроепіляції, шугарингу та воскової депіляції у Львові. Гарантуємо безпеку, якість та комфорт. Запишіться на процедуру вже сьогодні!"
        />
        <meta name="keywords" content="олександритовий лазер, лазерна депіляція, MS Studio, епіляція, депіляція, електроепіляція, курси, навчання, сертифікація, львів" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Студія лазерної епіляції, електроепіляції, шугарингу та воскової депіляції у Львові | MS Studio" />
        <meta property="og:description" content="У нас найкращі спеціалісти універсали, як підберуть найкращий метод видалення волосся, який підійде саме під Ваш тип шкіри, колір волосини та зони на якій ви хочете його позбутись." />
        <meta property="og:image" content="/assets/photos/carousel_2.webp" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Intro />
      <ServicesList />
    </>
  );
}

export default Services;
