import { Box, Typography, styled } from "@mui/material";

export const MainTitle = styled(Typography)(({ theme }) => ({
  textTransform: "uppercase",
  fontSize: "40px",
}));

export const MainContainer = styled(Box)(({ theme }) => ({
  paddingTop: "50px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",  
}));

