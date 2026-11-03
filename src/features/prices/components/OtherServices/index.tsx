"use client";

import { usePrices } from "@/context/PricesContext";
import { ExpandMore } from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useTranslation } from "react-i18next";
import Zones from "../Zones";

function OtherServices() {
  const { t } = useTranslation();
  const { nails, eyebrow } = usePrices();

  return (
    <>
      <AccordionDetails>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            {t("services.otherServices.nails")}
          </AccordionSummary>
          <AccordionDetails>
            <Accordion>
              <AccordionDetails id="panel4-header">
                <Zones zones={nails} />
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            {t("services.otherServices.lashes_brows_makeup")}
          </AccordionSummary>
          <AccordionDetails>
            <Accordion>
              <AccordionDetails id="panel4-header">
                <Zones zones={eyebrow} />
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
      </AccordionDetails>
    </>
  );
}

export default OtherServices;
