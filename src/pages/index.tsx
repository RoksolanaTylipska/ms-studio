import Masters from "@/components/Masters";
import Prices from "@/components/Prices";
import { Box } from "@mui/material";
import Benefits from "../components/Benefits";
import Carousel from "../components/Carousel";
import FAQ from "../components/FAQ";
import Photo from "../components/Photo";
import Reviews from "../components/Reviews";

function Home() {
  return (
    <>
      <Carousel />
      <Box>
        <Benefits />
        <Prices mainTitle={"header.services&prices"} />
        <Masters />
        <Photo />
        <Reviews />
        <FAQ />
      </Box>
    </>
  );
}

export default Home;
