import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

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
