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
  ComplexType,
  DiscountNumber,
  Discounts,
  SessionsNumber
} from "../LaserComplex/styled";

function Endosphere() {
  const { t } = useTranslation();

  return (
    <AccordionDetails id="panel-endosphere" sx={{ padding: "0px" }}>
      <TableContainer sx={{ padding: "0px", overflowX: "auto" }}>
        <Table sx={{ minWidth: 420 }}>
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
                <TableCell key={i} sx={{ borderColor: "transparent", padding: { xs: "10px 0px 10px 0px", sm: "10px 10px 10px 0px" }, textAlign: "right" }}>
                  <Discounts sx={{ alignItems: "flex-end" }}>
                    <Box textAlign="center">
                      <DiscountNumber sx={{ width: { xs: "60px", sm: "70px" }, height: { xs: "42px", sm: "50px" }, fontSize: { xs: "12px", sm: "14px" } }}>
                        {t(discount.label)}
                      </DiscountNumber>
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
                <TableCell sx={{ padding: "0px 8px 0px 0px", borderColor: "transparent" }}>
                  <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { sm: "baseline" }, gap: { xs: "1px", sm: "4px" } }}>
                    <ComplexTime variant="bodyComfortaa" sx={{ fontSize: { xs: "11px", sm: "12px" }, display: { sm: "none" } }}>
                      {t(zone.time)}
                    </ComplexTime>
                    <ComplexType variant="bodyComfortaa" sx={{ fontSize: { xs: "13px", sm: "16px" } }}>
                      {t(zone.name)}
                      <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}> -{" "}
                        <ComplexTime variant="bodyComfortaa" sx={{ fontSize: "12px" }}>
                          {t(zone.time)}
                        </ComplexTime>
                      </Box>
                    </ComplexType>
                  </Box>
                </TableCell>
                {zone.prices.map((price, j) => (
                  <TableCell key={j} sx={{ borderColor: "transparent", textAlign: "right", paddingRight: "0px", paddingLeft: "0px", whiteSpace: "nowrap" }}>
                    <ComplexPrice variant="bodyComfortaa" sx={{ fontSize: { xs: "13px", sm: "16px" } }}>{price}₴</ComplexPrice>
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
