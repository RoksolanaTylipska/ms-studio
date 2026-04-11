"use client";

import { TitleStars } from "@/components";
import { services } from "@/features/prices/constants/services";
import { ExpandMore } from "@mui/icons-material";
import { Box } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { PricesContainer } from "./styled";

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
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {t(title)}
                {title === "services.endosphere" && (
                  <Image
                    src="/assets/icons/new-icon.png"
                    alt="new"
                    width={40}
                    height={40}
                  />
                )}
              </Box>
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
