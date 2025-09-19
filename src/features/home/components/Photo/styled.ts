import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PhotoContainer = styled(Box)(({ theme }) => ({
  height: "80vh",
  backgroundImage: 'url("/assets/photos/touch.jpg")',
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    alignItems: "start",
  },
  [theme.breakpoints.down("sm")]: {
    alignItems: "start",
  },
}));

export const Text = styled(Box)(({ theme }) => ({
  width: "60vw",
  color: theme.palette.colors.white,
  fontSize: "70px",
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: "40px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "30px",
  },
}));

export const TextContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    marginTop: "100px",
  },
}));
