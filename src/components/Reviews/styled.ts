import { Box, styled } from "@mui/material";
import { Swiper } from "swiper/react";

export const SwiperStyled = styled(Swiper)({
  width: "100%",
  maxWidth: "1300px",
  paddingBottom: "50px",
  marginTop: "40px",
});

export const ReviewsContainer = styled(Box)({
  padding: "100px 0",
});

export const ImageContainer = styled(Box)({
  position: "relative",
  width: "80vw",
  height: "57vh",
});
