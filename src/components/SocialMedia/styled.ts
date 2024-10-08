import { Box, styled } from "@mui/material";

export const SocialMediaCircle = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.colors.gold,
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

