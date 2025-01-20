import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PhotoContainer = styled(Box)({
  width: "100vw",
  height: "80vh",
  backgroundImage: 'url("/assets/photos/touch.jpg")',
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Text = styled(Box)(({ theme }) => ({
  width: "60vw",
  color: theme.palette.colors.white,
  fontSize: "70px",
  textAlign: "center"
}));
