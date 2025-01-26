import { Box, styled } from "@mui/material";

export const ServicesBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  "&:hover": {
    color: theme.palette.colors.camel
  },
}));

export const PricesBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  flexDirection: "column",
  marginBottom: "10px"
}));

export const ModalContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "101vw",
  height: "101vh",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
}));

