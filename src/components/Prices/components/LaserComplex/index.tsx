"use client";

import { discountsComplexes } from "@/constants/lazerEpilation";
import { Complex } from "@/types/lazerEpilation";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useTranslation } from "react-i18next";
import {
  ComplexNameContainer,
  ComplexPrice,
  ComplexTime,
  ComplexTimeContainer,
  ComplexType,
  ComplexZone,
  DiscountNumber,
  Discounts,
  SessionsNumber,
} from "./styled";

interface ComplexProps {
  complexes: Complex[];
}
function LaserComplex({ complexes }: ComplexProps) {
  const { t } = useTranslation();

  return (
    <>
      <AccordionDetails id="panel4-header" sx={{ padding: "0px" }}>
        <TableContainer sx={{ padding: "0px", overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    padding: "0px",
                    borderColor: "transparent",
                    width: "70%",
                  }}
                >
                  <TableSortLabel>
                    <Typography variant="bodyCaveat">
                      {t("lazerEpilation.payLess")}{" "}
                    </Typography>
                  </TableSortLabel>
                </TableCell>
                {discountsComplexes.map((discount, i) => (
                  <TableCell sx={{ borderColor: "transparent" }}>
                    <Discounts>
                      <Box key={i} textAlign="center">
                        <DiscountNumber>{discount.label}</DiscountNumber>
                      </Box>
                      <SessionsNumber>
                        {t(`${discount.sessions}`)}
                      </SessionsNumber>
                    </Discounts>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {complexes.map((complex, i) => (
                <TableRow>
                  <TableCell
                    sx={{ padding: "0px", borderColor: "transparent" }}
                  >
                    <ComplexNameContainer key={i}>
                      <ComplexTimeContainer>
                        <ComplexType variant="bodyComfortaa">
                          {complex.type}
                        </ComplexType>
                        <ComplexTime variant="bodyComfortaa">
                          {complex.time}
                        </ComplexTime>
                      </ComplexTimeContainer>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <ComplexZone variant="bodyComfortaa">
                          {t(`${complex.name}`)}
                        </ComplexZone>
                      </Box>
                    </ComplexNameContainer>
                  </TableCell>
                  {complex.prices.map((price, i) => (
                    <TableCell sx={{ borderColor: "transparent" }}>
                      <ComplexPrice variant="bodyComfortaa" key={i}>
                        {price}₴
                      </ComplexPrice>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </>
  );
}

export default LaserComplex;
