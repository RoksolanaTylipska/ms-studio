import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FeedbackListContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  // The photo fades in from the block's colour so there is no hard edge
  backgroundImage: `linear-gradient(to right, ${theme.palette.colors.caramel}, rgba(224, 214, 208, 0) 30%), url('/assets/photos/feedback.webp')`,
  backgroundSize: "cover",
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  padding: "20px",

  borderRadius: 0,
  width: "100%",
  maxHeight: "670px",
  overflow: "auto",
  [theme.breakpoints.down("md")]: {
    borderRadius: 0,
    // Stacked under the form on narrow screens: fade from the top instead
    backgroundImage: `linear-gradient(to bottom, ${theme.palette.colors.caramel}, rgba(224, 214, 208, 0) 15%), url('/assets/photos/feedback.webp')`,
  },
}));

export const FeedbackItem = styled("li")(({ theme }) => ({
  position: "relative",
  padding: "10px",
  backgroundColor: theme.palette.colors.white,
  borderRadius: "10px",
  width: "80%",
  maxHeight: "220px",
  overflow: "auto",
  [theme.breakpoints.down("md")]: {
    width: "90%",
    maxHeight: "145px",
  },

  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.colors.gold,
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
}));

export const ImageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "15px",
  margin: "5px 0",
}));

export const FeedbackDate = styled(Typography)(({ theme }) => ({
  position: "absolute",
  right: "10px",
  top: "10px",
  fontSize: "12px",
}));

export const List = styled("ul")({
  padding: 0,
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
});
