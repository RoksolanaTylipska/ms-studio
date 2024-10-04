"use client";

import { discountsZones } from "@/constants/lazerEpilation";
import { Zone } from "@/types/lazerEpilation";
import { Box, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useTranslation } from "react-i18next";
import {
  DiscountBox,
  DiscountNumber,
  Discounts,
  LabelPriceContainer,
  PricesBox,
  SessionsNumber,
  ZonePrice,
  ZoneTitle,
  ZonesContainer,
} from "./styled";

interface ComplexProps {
  zones: Zone[];
}
function LaserZone({ zones }: ComplexProps) {
  const { t } = useTranslation();

  console.log(zones);
  return (
    <Accordion>
      <AccordionDetails sx={{padding: "0px 0px 20px 0px"}}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
          }}
        >
          <DiscountBox>
            {discountsZones.map((discount, i) => (
              <Discounts>
                <Box key={i} textAlign="center">
                  {discount.label && (
                    <DiscountNumber>{discount.label}</DiscountNumber>
                  )}
                </Box>
                <SessionsNumber>{t(`${discount.sessions}`)}</SessionsNumber>
              </Discounts>
            ))}
          </DiscountBox>
        </Box>
        {zones.map((zone, i) => (
          <ZonesContainer key={i}>
            <ZoneTitle variant="bodyComfortaa">{t(`${zone.title}`)}</ZoneTitle>
            {zone.variants.map((variant, i) => (
              <LabelPriceContainer key={i}>
                <Typography variant="bodyComfortaa">
                  {t(`${variant.label}`)}
                </Typography>
                <PricesBox>
                  <ZonePrice variant="bodyComfortaa">
                    {variant.price[0]}₴
                  </ZonePrice>
                  <ZonePrice variant="bodyComfortaa">
                    {variant.price[1]}₴
                  </ZonePrice>
                </PricesBox>
              </LabelPriceContainer>
            ))}
          </ZonesContainer>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}

export default LaserZone;
