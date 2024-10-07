import { Box, Typography, styled } from "@mui/material";

export const TrialBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.colors.gold,
  display: "flex",
  gap: "50px",
  height: "auto",
  width: "100%",
  margin: "20px auto",
  padding: "10px 100px",
  borderRadius: "30px",
}));

export const FlexContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "60px",
  paddingRight: "50px",
  flexDirection: "column",
});

export const LabelContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

export const ValuesContainer = styled(Box)({
  display: "flex",
  gap: "35px",
});

export const PriceContainer = styled(Box)({
  display: "flex",
  gap: "120px",
});

export const VariantsContainer = styled(Box)({
  display: "flex",
  gap: "15px",
  justifyContent: "space-between",
  paddingTop: "15px",
  flexDirection: "column",
});

export const LabelTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.colors.camel,
  fontWeight: 500,
  fontSize: "18px"

}));

