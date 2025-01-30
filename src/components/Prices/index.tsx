"use client";

import { ExpandMore } from "@mui/icons-material";
import { Box, useMediaQuery } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useTranslation } from "react-i18next";
import TitleStars from "../TitleStars";
import { PricesContainer } from "./styled";
import PriceModal from "./components/PriceModal";
import { services } from "@/constants/services"

function Prices({ mainTitle }: { mainTitle: string }) {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <PricesContainer>
      <TitleStars title={mainTitle} filledStars={true} lines={true} />

      {isMobile ? (
        <PriceModal />
      ) : (
        <Box>
          {services.map(({ title, Component }) => (
            <Accordion key={title}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                {t(title)}
              </AccordionSummary>

              <AccordionDetails>
                <Component />
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )} 
    </PricesContainer>
  );
}

export default Prices;
