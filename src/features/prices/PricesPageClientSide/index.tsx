import Prices from "..";
import { PricesContainer } from "./styled";

function PricesClientSide() {
  return (
    <PricesContainer>
      <Prices mainTitle="header.prices" titleComponent="h1" />
    </PricesContainer>
  );
}

export default PricesClientSide;
