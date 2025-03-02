import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";

export const FooterContainer = styled("footer")(({ theme }) => ({
  width: "100%",
  display: "flex",
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: theme.palette.colors.chocolate,
  height: "250px",
  paddingInline: "70px",
  gap: "20px",
}));

export const BlockContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  color: theme.palette.colors.camel,
  width: "100%",
}));

export const TextContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "20px",
  height: "180px",
  flex: 1,
});

export const PhoneNumber = styled(Link)(({ theme }) => ({
  color: theme.palette.colors.gold,
  fontFamily: "'Comfortaa', sans-serif",
  fontSize: "14px",
}));

export const AddressText = styled(Typography)(({ theme }) => ({
  textDecoration: "underline",
  color: theme.palette.colors.gold,
  textUnderlineOffset: "5px",
}));

export const ScheduleText = styled(Typography)(({ theme }) => ({
  color: theme.palette.colors.gold,
  width: "250px", 
  textAlign: "center", 
  lineHeight: "25px"
}));

export const InfoText = styled(Typography)(({ theme }) => ({
  textDecoration: "underline",
  color: theme.palette.colors.gold,
}));

export const TopInfo = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  justifyContent: "end",
  height: "70%"
});

export const SocialMediaContainer = styled(Box)({
  display: "flex",
  gap: "10px",
  justifyContent: "end",
});

export const PolicyText = styled(Typography)(({ theme }) => ({
  color: theme.palette.colors.camel,
  fontSize: "12px"
}));


