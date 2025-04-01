import { Box, Typography, styled } from "@mui/material";

export const ServicesContainer = styled(Box)(({ theme }) => ({
  paddingTop: "85px",
  [theme.breakpoints.down("sm")]: {
    paddingTop: "0px",
  },
}));

export const IntroContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.colors.caramel,
  width: "100%",
  height: "730px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
    height: "900px",

  },
}));

export const ImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  flex: 1,
}));

export const TextContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: "40px",
  textAlign: "center",
  textTransform: "uppercase",
  [theme.breakpoints.down("md")]: {
    fontSize: "30px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "20px",
  },
}));

export const Description = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  width: "80%",
  lineHeight: "20px",
  [theme.breakpoints.down("md")]: {
    fontSize: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "15px",
  },
}));
