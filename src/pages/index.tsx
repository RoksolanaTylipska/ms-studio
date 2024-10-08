import Prices from "@/components/Prices";
import Masters from "@/pages/home/components/Masters";
import { Box } from "@mui/material";
import Benefits from "./home/components/Benefits";
import Carousel from "./home/components/Carousel";
import Photo from "./home/components/Photo";
import Reviews from "./home/components/Reviews";
import FAQ from "./home/components/FAQ";

function Home() {
  return (
    <>
      <Carousel />
      <Box>
        <Benefits />
        <Prices />
        <Masters />
        <Photo />
        <Reviews />
        <FAQ />
      </Box>
    </>
  );
}

export default Home;
