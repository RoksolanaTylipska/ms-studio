import Prices from "..";
import { PricesContainer } from "./styled";

function PricesClientSide() {
  return (
    <PricesContainer>
      <Prices mainTitle="header.prices" />
    </PricesContainer>
  );
}

export default PricesClientSide;
