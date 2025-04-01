"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useTranslation } from "react-i18next";
import {
  LabelTypography,
  TextTypography,
  TrialBox,
} from "./styled";
import { electroepilation } from "../../constants/electroepilation";

function ElectroepilationDetails() {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");

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

        <TableContainer sx={{overflow: "hidden"}}>
          {electroepilation.map((item, i) => (
            <Table>
              <TableHead sx={{ borderColor: "transparent" }}>
                <TableRow>
                  <TableCell sx={{ width: "70%", borderColor: "transparent", padding: "0px" }}>
                    <LabelTypography>{t(`${item.masterQnt}`)}</LabelTypography>
                  </TableCell>
                  {item.values.map((value, i) => (
                    <TableCell sx={{ borderColor: "transparent", padding: isMobile ? "0px" : "16px"}}>
                      <LabelTypography variant="bodyComfortaa">
                        {t(`${value}`)}
                      </LabelTypography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {item.variants.map((variant, j) => (
                  <TableRow key={j}>
                    <TableCell
                      sx={{ padding: "0px", borderColor: "transparent" }}
                    >
                      <TextTypography>{t(variant.label)}</TextTypography>
                    </TableCell>
                    <TableCell sx={{ borderColor: "transparent" }}>
                    <TextTypography>{variant.time} {t("general.min")}</TextTypography>
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "center", borderColor: "transparent" }}
                    >
                       <TextTypography>{variant.price[0]} ₴</TextTypography>
                    </TableCell>
                    <TableCell
                      sx={{ textAlign: "center", borderColor: "transparent" }}
                    >
                     <TextTypography>{variant.price[1]} ₴</TextTypography> 
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ))}
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
}

export default ElectroepilationDetails;
