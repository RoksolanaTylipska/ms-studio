import { styled } from "@mui/material";
import { Swiper } from "swiper/react";
import { fullBleedMedia } from "@/styles/fullBleed";

export const SwiperStyled = styled(Swiper)(({ theme }) => ({
  // Doubled class beats swiper.css's own `.swiper { margin: auto }`
  "&&": fullBleedMedia,
  height: "815px",
  backgroundColor: "#DBDBD9",
  [theme.breakpoints.down("sm")]: { 
    backgroundColor: "#b5b2b1",
  },
}));




