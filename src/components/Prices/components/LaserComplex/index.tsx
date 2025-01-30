"use client";

import { discountsComplexes } from "@/constants/lazerEpilation";
import { ExpandMore } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useTranslation } from "react-i18next";
import {
  ComplexNameContainer,
  ComplexPrice,
  ComplexTime,
  ComplexTimeContainer,
  ComplexType,
  ComplexZone,
  DiscountBox,
  DiscountNumber,
  Discounts,
  PricesBox,
  SessionsNumber,
} from "./styled";
import { Complex } from "@/types/lazerEpilation";

interface ComplexProps {
  complexes: Complex[];
}
function LaserComplex({ complexes }: ComplexProps) {
  const { t } = useTranslation();

  return (
    <>
      {/* <AccordionSummary

        expandIcon={<ExpandMore />}
        aria-controls="panel3-content"
        id="panel3-header"
      >
        {t("services.complex")} */}
      {/* </AccordionSummary> */}
      <AccordionDetails>
        <Box
          sx={{
            paddingTop: "20px",

            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="bodyCaveat" >{t("lazerEpilation.payLess")} </Typography>

          <DiscountBox>
            {discountsComplexes.map((discount, i) => (
              <Discounts>
                <Box key={i} textAlign="center">
                  <DiscountNumber>{discount.label}</DiscountNumber>
                </Box>
                <SessionsNumber>{t(`${discount.sessions}`)}</SessionsNumber>
              </Discounts>
            ))}
          </DiscountBox>
        </Box>
      </AccordionDetails>
      <AccordionDetails id="panel4-header">
        {complexes.map((complex, i) => (
          <ComplexNameContainer key={i}>
            <ComplexTimeContainer>
              <ComplexType variant="bodyComfortaa">{complex.type}</ComplexType>
              <ComplexTime variant="bodyComfortaa">{complex.time}</ComplexTime>
            </ComplexTimeContainer>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <ComplexZone variant="bodyComfortaa">
                {t(`${complex.name}`)}
              </ComplexZone>
              <PricesBox>
                {complex.prices.map((price, i) => (
                  <ComplexPrice variant="bodyComfortaa" key={i}>
                    {price}₴
                  </ComplexPrice>
                ))}
              </PricesBox>
            </Box>
          </ComplexNameContainer>
        ))}
      </AccordionDetails>
    </>

  );
}

export default LaserComplex;
