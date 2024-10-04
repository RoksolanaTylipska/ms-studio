"use client";

import { ExpandMore } from "@mui/icons-material";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useTranslation } from "react-i18next";
import Electroepilation from "../Electroepilation";
import LaserEpilation from "../LaserEpilation";
import TitleStars from "../TitleStars";
import { PricesContainer } from "./styled";

function Prices() {
  const { t } = useTranslation();

  return (
    <PricesContainer>
      <TitleStars
        title={"header.services&prices"}
        filledStars={true}
        lines={true}
      />

      <Box>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            {t("services.lazer")}
          </AccordionSummary>

          <AccordionDetails>
            <LaserEpilation />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            {t("services.electroepilation")}
          </AccordionSummary>

          <AccordionDetails>
            <Electroepilation />
          </AccordionDetails>
        </Accordion>
      </Box>
    </PricesContainer>
  );
}

export default Prices;
