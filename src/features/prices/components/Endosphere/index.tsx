"use client";

import { endosphere, endosphereDiscounts } from "@/features/prices/constants/endosphere";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useTranslation } from "react-i18next";
import {
  ComplexPrice,
  ComplexTime,
  ComplexTimeContainer,
  ComplexType,
  DiscountNumber,
  Discounts,
  SessionsNumber
} from "../LaserComplex/styled";

function Endosphere() {
  const { t } = useTranslation();

  return (
    <AccordionDetails id="panel-endosphere" sx={{ padding: "0px" }}>
      <TableContainer sx={{ padding: "0px", overflow: "hidden" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  padding: "0px",
                  borderColor: "transparent",
                  paddingBottom: "20px",
                }}
              />
              {endosphereDiscounts.map((discount, i) => (
                <TableCell key={i} sx={{ borderColor: "transparent", padding: "10px 10px 10px 0px", textAlign: "right" }}>
                  <Discounts sx={{ alignItems: "flex-end" }}>
                    <Box textAlign="center">
                      <DiscountNumber>{discount.label}</DiscountNumber>
                    </Box>
                    {discount.sessions && (
                      <SessionsNumber sx={{ textAlign: "center" }}>{t(discount.sessions)}</SessionsNumber>
                    )}
                  </Discounts>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {endosphere.map((zone, i) => (
              <TableRow key={i}>
                <TableCell sx={{ padding: "0px", borderColor: "transparent" }}>
                  <ComplexTimeContainer>
                    <ComplexType variant="bodyComfortaa">
                      {t(zone.name)} -
                    </ComplexType>
                    <ComplexTime variant="bodyComfortaa">{zone.time}</ComplexTime>
                  </ComplexTimeContainer>
                </TableCell>
                {zone.prices.map((price, j) => (
                  <TableCell key={j} sx={{ borderColor: "transparent", textAlign: "right", paddingRight: "0px", paddingLeft: "0px" }}>
                    <ComplexPrice variant="bodyComfortaa">{price}₴</ComplexPrice>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AccordionDetails>
  );
}

export default Endosphere;
