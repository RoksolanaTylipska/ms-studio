import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";

export const ModalContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  [theme.breakpoints.down("sm")]: {
    padding: "30px",
  },
}));

export const ModalImage = styled(Image)(({ theme }) => ({
  height: "80vh",
  width: "auto",
  borderRadius: "15px",

  [theme.breakpoints.down("md")]: {
    height: "60vh",
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "90vw",
    height: "auto",
  },
}));
