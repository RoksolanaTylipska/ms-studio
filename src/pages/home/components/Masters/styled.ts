import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Swiper } from "swiper/react";

export const MastersContainer = styled(Box)({
  padding: "100px 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const SwiperStyled = styled(Swiper)({
  width: "100%",
  maxWidth: "1200px",
  paddingBottom: "50px",
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

export const Name = styled(Typography)({
  textAlign: "center",
  fontSize: "20px"
})

export const Position = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontWeight: 400,
  fontSize: "14px",
  color: theme.palette.colors.camel,
  lineHeight: "20px"
}));

export const Description = styled(Typography)({
  textAlign: "center",
  fontWeight: 200,
  fontSize: "12px",
  lineHeight: "20px"
});

export const CertificatesContainer = styled(Box)({
   width: "80%",
   justifyContent: "end",
   display: "flex"
})

export const CertificatesText = styled(Typography)(({ theme }) => ({
  ":hover": {
    color: theme.palette.colors.camel,
    textDecoration: "underline"
  },}))




