"use client";

import { electroepilation } from "@/constants/electroepilation";
import { Box, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useTranslation } from "react-i18next";
import {
  FlexContainer,
  LabelContainer,
  LabelTypography,
  PriceContainer,
  TrialBox,
  ValuesContainer,
  VariantsContainer,
} from "./styled";

function ElectroepilationDetails() {
  const { t } = useTranslation();

  return (
    <Accordion>
      <AccordionDetails>
        <TrialBox>
          <Typography variant="bodyCaveat">
            {t("electroepilation.trial")}
          </Typography>
          <Typography variant="bodyCaveat">
            {t("electroepilation.trialTime")}
          </Typography>
          <Typography variant="bodyCaveat">
            {t("electroepilation.trialPrice")}
          </Typography>
        </TrialBox>
        <Box>
          {electroepilation.map((item, i) => (
            <FlexContainer>
              <LabelContainer key={i}>
                <LabelTypography sx={{ width: "300px" }} variant="bodyComfortaa">
                  {t(`${item.masterQnt}`)}
                </LabelTypography>

                <ValuesContainer>
                  {item.values.map((value, i) => (
                    <LabelTypography variant="bodyComfortaa">
                      {t(`${value}`)}
                    </LabelTypography>
                  ))}
                </ValuesContainer>
              </LabelContainer>
              <VariantsContainer>
                {item.variants.map((variant, i) => (
                  <LabelContainer key={i}>
                    <Typography variant="bodyComfortaa">
                      {t(`${variant.label}`)}
                    </Typography>
                    <PriceContainer>
                      <Typography variant="bodyComfortaa">
                        {variant.time}{t("general.min")}
                      </Typography>
                      <Typography variant="bodyComfortaa">
                        {variant.price[0]} ₴
                      </Typography>
                      <Typography variant="bodyComfortaa">
                       {variant.price[1]} ₴
                      </Typography>
                    </PriceContainer>
                  </LabelContainer>
                ))}
              </VariantsContainer>
            </FlexContainer>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default ElectroepilationDetails;
