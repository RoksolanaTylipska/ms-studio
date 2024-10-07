import { Box, Typography, styled } from "@mui/material";

export const DiscountBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  paddingRight: "50px",
  gap: "30px",
});

export const Discounts = styled(Box)({
  display: "flex",
  justifyContent: "end",
  flexDirection: "column",
});

export const DiscountNumber = styled(Typography)(({ theme }) => ({
  fontFamily: "'Comfortaa', sans-serif",
  backgroundColor: theme.palette.colors.gold,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "50px",
  height: "35px",
  padding: "2px 8px",
  marginBottom: "5px",
  borderRadius: "50%",
}));

export const SessionsNumber = styled(Typography)({
  fontFamily: "'Comfortaa', sans-serif",
  fontSize: "12px",
});

export const ComplexNameContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

export const ComplexTimeContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  minWidth: "80px",
  gap: "10px",
});

export const ComplexType = styled(Typography)({
  fontSize: "16px",
  fontWeight: 300
});

export const ComplexTime = styled(Typography)(({ theme }) => ({
  color: theme.palette.colors.camel,
  fontSize: "12px",
}));

export const ComplexZone = styled(Typography)(({ theme }) => ({
  marginBottom: "20px"
}));

export const ComplexPrice = styled(Typography)({
  fontSize: "16px",
});

export const PricesBox = styled(Typography)({
  display: "flex",
  flexDirection: "row",
  gap: "40px",
  paddingRight: "50px"
});
