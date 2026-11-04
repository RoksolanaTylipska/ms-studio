import { Box, styled } from "@mui/material";
import { fullBleed } from "@/styles/fullBleed";

export const PrivacyPolicyContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  backgroundColor: theme.palette.colors.caramel,
  ...fullBleed(theme.palette.colors.caramel),
}));

export const TermsContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
});
