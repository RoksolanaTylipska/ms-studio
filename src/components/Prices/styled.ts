import { Box, styled } from "@mui/material";

export const PricesContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.colors.caramel,
  display: "flex",
  flexDirection: "column",
  gap: "50px",
  height: "auto",
  width: "100%",
  padding: "100px 75px 200px",
}));
