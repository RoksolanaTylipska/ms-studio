import Feedback from "@/features/home/components/Feedback";
import { VideoBlock } from "@/features/home/components/VideoBlock";
import Masters from "@/features/home/components/Masters";
import RemovalMethods from "@/features/home/components/RemovalMethods";
import dynamic from "next/dynamic";
import Head from "next/head";
import Photo from "../features/home/components/Photo";
import Reviews from "../features/home/components/Reviews";
import WelcomeCarousel from "../features/home/components/WelcomeCarousel";
import Prices from "@/features/prices";

const FAQ = dynamic(() => import("../features/home/components/FAQ/index"), { ssr: false });

function Home() {
  return (
    <>
      <Head>
        <title>MS Laser Lviv | Cтудія лазерної епіляції, електроепіляції, шугарингу та воскової депіляції у Львові
        </title>
        <meta name="description" content="Професійні послуги лазерної епіляції, електроепіляції, шугарингу та воскової депіляції у Львові. Гарантуємо безпеку, якість та комфорт. Запишіться на процедуру вже сьогодні!"
        />
        <meta name="keywords" content="олександритовий лазер, лазерна депіляція, MS Laser, епіляція, депіляція, електроепіляція, курси, навчання, сертифікація, львів" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Студія лазерної епіляції, електроепіляції, шугарингу та воскової депіляції у Львові | MS Laser Lviv" />
        <meta property="og:description" content="У MS Laser найкращі спеціалісти універсали, як підберуть найкращий метод видалення волосся, який підійде саме під Ваш тип шкіри, колір волосини та зони на якій ви хочете його позбутись." />
        <meta property="og:image" content="/assets/photos/carousel_2.webp" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/icons/logo-gold.png" />
      </Head>
      <WelcomeCarousel />
      <RemovalMethods />
      <Prices mainTitle="header.services&prices" />
      <Masters />
      <Photo />
      <VideoBlock />
      <Reviews />
      <FAQ />
      <Feedback />
    </>
  );
}

export default Home;
