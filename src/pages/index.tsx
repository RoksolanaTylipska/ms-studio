import Masters from "@/components/Masters";
import Prices from "@/components/Prices";
import { Box } from "@mui/material";
import Benefits from "../components/Benefits";
import Carousel from "../components/Carousel";
import Photo from "../components/Photo";
import Reviews from "../components/Reviews";
import dynamic from "next/dynamic";
import { VideoBlock } from "@/components/VideoBlock";

const FAQ = dynamic(() => import("../components/FAQ/index"), { ssr: false });

function Home() {
  return (
    <>
      <Carousel />
      <Box>
        <Benefits />
        <Prices mainTitle={"header.services&prices"} />
        <Masters />
        <Photo />
        {/* <VideoBlock /> */}
        <Reviews />
        <FAQ />
      </Box>
    </>
  );
}

export default Home;
