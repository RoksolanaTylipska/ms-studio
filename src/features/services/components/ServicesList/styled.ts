import { Box, styled } from "@mui/material";
import { Swiper } from "swiper/react";

export const SwiperStyled = styled(Swiper)(({ theme }) => ({
  margin: "auto",
  width: "85%",
  height: "700px",
  [theme.breakpoints.down("md")]: {
    height: "900px",
    width: "75%",
  },
  [theme.breakpoints.down("sm")]: {
    height: "600px",
    width: "100%",
  },
}));

export const ImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
