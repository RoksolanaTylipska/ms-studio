import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";

export const GalleryContainer = styled(Box)(({ theme }) => ({
  margin: "130px 50px",
  [theme.breakpoints.down("md")]: {
    margin: "130px 50px",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "50px 20px",
  },
}));

export const PhotosContainer = styled(Box)(({ theme }) => ({
  marginTop: "50px",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "40px 30px",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

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
