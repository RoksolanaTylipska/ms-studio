import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Swiper } from "swiper/react";

export const SwiperStyled = styled(Swiper)({
  width: "100%",
  paddingBottom: "50px",
});

export const RemovalMethodsContainer = styled(Box)(({ theme }) => ({
  padding: "110px 0px",
  display: "flex",
  gap: "60px",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    padding: "70px 0px",
    gap: "50px",
  },
}));

export const RemovalMethodsList = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginInline: "65px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    margin: "auto",
  },
}));


