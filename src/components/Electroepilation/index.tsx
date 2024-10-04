"use client";

import { ExpandMore } from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useTranslation } from "react-i18next";
import ElectroepilationDetails from "../ElectroepilationDetails";

function Electroepilation() {
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
              <ElectroepilationDetails />
            </AccordionDetails>
          </Accordion>
      </AccordionDetails>
    </>
  );
}

export default Electroepilation;