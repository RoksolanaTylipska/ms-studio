import FAQ from "@/features/home/components/FAQ";
import Feedback from "@/features/home/components/Feedback";
import { VideoBlock } from "@/features/home/components/VideoBlock";
import Masters from "@/features/home/components/Masters";
import RemovalMethods from "@/features/home/components/RemovalMethods";
import { Seo } from "@/components/Seo";
import Head from "next/head";
import Photo from "../features/home/components/Photo";
import Reviews from "../features/home/components/Reviews";
import WelcomeCarousel from "../features/home/components/WelcomeCarousel";
import Prices from "@/features/prices";
import { fetchPriceSettings } from "@/lib/priceOverrides";
import { GetStaticProps } from "next";

function Home() {
  return (
    <>
      <Seo
        title="MS Laser Lviv | Студія лазерної епіляції та електроепіляції у Львові"
        description="Лазерна епіляція олександритовим лазером, електроепіляція, шугаринг і воскова депіляція у Львові. Досвідчені майстри, безпечні процедури, запис онлайн."
        path="/"
      />
      <Head>
        {/* Hero slide background is the LCP element: start loading it before CSS is parsed */}
        <link
          rel="preload"
          as="image"
          href="/assets/photos/carousel_1-mobile.webp"
          media="(max-width: 767.98px)"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/photos/carousel_1.webp"
          media="(min-width: 768px)"
        />
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

export const getStaticProps: GetStaticProps = async () => ({
  props: { priceSettings: await fetchPriceSettings() },
  // Prices edited in /admin show up on the site within a minute
  revalidate: 60,
});
