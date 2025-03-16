import Masters from "@/components/Masters";
import Prices from "@/components/Prices";
import { Box } from "@mui/material";
import Carousel from "../components/Carousel";
import Photo from "../components/Photo";
import Reviews from "../components/Reviews";
import dynamic from "next/dynamic";
import { VideoBlock } from "@/components/VideoBlock";
import RemovalMethods from "@/components/RemovalMethods";
import Head from "next/head";
import Feedback from "@/components/Feedback";

const FAQ = dynamic(() => import("../components/FAQ/index"), { ssr: false });


function Home() {
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
        <link rel="icon" href="/assets/icons/logo-gold.png" />
      </Head>
      <Carousel />
      <Box>
        <RemovalMethods />
        <Prices mainTitle={"header.services&prices"} />
        <Masters />
        <Photo />
        <VideoBlock />
        <Reviews />
        <FAQ />
        <Feedback />
      </Box>
    </>
  );
}

export default Home;
