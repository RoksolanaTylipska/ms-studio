import { Box, CardMedia, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Swiper } from "swiper/react";

export const MastersContainer = styled(Box)({
  padding: "50px 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const SwiperStyled = styled(Swiper)({
  width: "100%",
  maxWidth: "1200px",
  paddingBottom: "60px",
  marginTop: "40px",
});

export const MasterCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.colors.caramel,
  borderRadius: "25px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "500px",
}));

export const TypographyBox = styled(Box)({
  padding: "30px 20px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

export const Name = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: "20px"
}))

export const Position = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontWeight: 400,
  fontSize: "14px",
  color: theme.palette.colors.camel
}));

export const Description = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontWeight: 200,
  fontSize: "12px",
}));




