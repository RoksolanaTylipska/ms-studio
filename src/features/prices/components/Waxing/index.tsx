"use client";

import { usePrices } from "@/context/PricesContext";
import Zones from "../Zones";

function Waxing() {
  const { waxing } = usePrices();

  return <Zones zones={waxing} columns={["general.women", "general.men"]} />;
}

export default Waxing;
