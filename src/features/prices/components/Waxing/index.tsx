"use client";

import { usePrices } from "@/context/PricesContext";
import { useTranslation } from "react-i18next";
import Zones from "../Zones";
import { GenderTitle } from "./syled";

function Waxing() {
  const { t } = useTranslation();
  const { waxing } = usePrices();

  return (
    <>
      <GenderTitle variant="bodyCaveat">{t("general.women")} / {t("general.men")}</GenderTitle>
      <Zones zones={waxing} discounts={false} />
    </>
  );
}

export default Waxing;
