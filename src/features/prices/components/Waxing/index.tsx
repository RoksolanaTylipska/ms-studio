"use client";

import { waxing } from "@/features/prices/constants/waxing";
import { ExpandMore } from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useTranslation } from "react-i18next";
import Zones from "../Zones";
import { Box, Typography } from "@mui/material";
import { GenderTitle } from "./syled";

function Waxing() {
  const { t } = useTranslation();

  return (
    <>
      <AccordionDetails>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            {t("services.gender.women")} / {t("services.gender.men")}
          </AccordionSummary>
          <AccordionDetails>
            <Accordion>
              <AccordionDetails id="panel4-header">
                <GenderTitle variant="bodyCaveat">{t("general.women")} / {t("general.men")}</GenderTitle>
                <Zones zones={waxing} discounts={false} />
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
      </AccordionDetails>
    </>
  );
}

export default Waxing;
