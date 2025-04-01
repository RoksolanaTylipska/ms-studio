import { styled } from "@mui/material";
import { Swiper } from "swiper/react";

export const SwiperStyled = styled(Swiper)(({ theme }) => ({
  height: "815px",
  backgroundColor: "#DBDBD9",
  [theme.breakpoints.down("sm")]: { 
    backgroundColor: "#b5b2b1",
  },
}));




