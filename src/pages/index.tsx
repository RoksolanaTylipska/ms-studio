import Prices from "@/components/Prices";
import Masters from "@/pages/home/components/Masters";
import Benefits from "./home/components/Benefits";
import Carousel from "./home/components/Carousel";
import { Box } from "@mui/material";

function Home() {
  return (
    <>
      <Carousel />
      <Box>
        <Benefits />
        <Prices />
        <Masters />
      </Box>
    </>
  );
}

export default Home;
