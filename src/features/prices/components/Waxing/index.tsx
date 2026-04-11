"use client";

import { waxing } from "@/features/prices/constants/waxing";
import { useTranslation } from "react-i18next";
import Zones from "../Zones";
import { GenderTitle } from "./syled";

function Waxing() {
  const { t } = useTranslation();

  return (
    <>
      <GenderTitle variant="bodyCaveat">{t("general.women")} / {t("general.men")}</GenderTitle>
      <Zones zones={waxing} discounts={false} />
    </>
  );
}

export default Waxing;
