"use client";

import { services } from "@/features/prices/constants/services";
import { ExpandMore } from "@mui/icons-material";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useTranslation } from "react-i18next";
import { PricesContainer } from "./styled";
import { TitleStars } from "@/components";

function Prices({ mainTitle }: { mainTitle: string }) {
  const { t } = useTranslation();

  return (
    <PricesContainer>
      <TitleStars title={mainTitle} filledStars={true} lines={true} />
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
    </PricesContainer>
  );
}

export default Prices;
