import { Box, Typography, styled } from "@mui/material";

export const ThankYouContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: '100%',
  gap:"50px",
  flexDirection: "column"
}));

export const ThankYouText = styled(Typography)(({ theme }) => ({
  fontSize: "70px", 
  rotate: ("-10deg"), 
  textAlign: "left"
}));

