import Prices from "@/components/Prices";
import Benefits from "./home/components/Benefits";
import Carousel from "./home/components/Carousel";
import { HomeContainer } from "./styled";

function Home() {
  return (
    <>
      <Carousel />
      <HomeContainer>
        <Benefits />
        <Prices />
      </HomeContainer>
    </>
  );
}

export default Home;
