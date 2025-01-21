import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";

export const ContactsContainer = styled(Box)(({ theme }) => ({
  margin: "150px 60px",
  height: "550px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "30px",
  [theme.breakpoints.down("md")]: { 
    margin: "100px 0px",
    flexDirection: "column", 
    gap: "40px",
  },
}));

export const MapContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.colors.caramel,
  borderRadius: "35px",
  padding: "25px;",
  width: "80%",
  display: "flex",
  flexDirection: "column", 
  alignItems: "center",
  gap: "60px",
}));

export const InfoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "20px",
}));

export const PhoneNumber = styled(Link)(({ theme }) => ({
  color: theme.palette.colors.chocolate,
  fontFamily: "'Comfortaa', sans-serif",
  fontSize: "14px",
  textAlign: "center"
}));

export const AddressText = styled(Typography)(({ theme }) => ({
  textDecoration: "underline",
  color: theme.palette.colors.chocolate,
  textUnderlineOffset: "5px",
}));

export const ScheduleText = styled(Typography)(({ theme }) => ({
  color: theme.palette.colors.chocolate,
  width: "250px", 
  textAlign: "center", 
  lineHeight: "25px"
}));

export const SocialMediaContainer = styled(Box)({
  margin: "auto",
  display: "flex",
  gap: "10px",
  justifyContent: "end",
});

