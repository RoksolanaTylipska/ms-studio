import Feedback from "@/features/home/components/Feedback";
import { VideoBlock } from "@/features/home/components/VideoBlock";
import Masters from "@/features/home/components/Masters";
import RemovalMethods from "@/features/home/components/RemovalMethods";
import dynamic from "next/dynamic";
import { Seo } from "@/components/Seo";
import Photo from "../features/home/components/Photo";
import Reviews from "../features/home/components/Reviews";
import WelcomeCarousel from "../features/home/components/WelcomeCarousel";
import Prices from "@/features/prices";

const FAQ = dynamic(() => import("../features/home/components/FAQ/index"), { ssr: false });

function Home() {
  return (
    <>
      <Seo
        title="MS Laser Lviv | Студія лазерної епіляції та електроепіляції у Львові"
        description="Лазерна епіляція олександритовим лазером, електроепіляція, шугаринг і воскова депіляція у Львові. Досвідчені майстри, безпечні процедури, запис онлайн."
        path="/"
      />
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
