import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CARD_RADIUS } from "@/styles/card";

export const FeedbackContainer = styled(Box)(({ theme }) => ({
  padding: "75px",
  height: "auto",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    padding: "40px 30px",
  },
}));

export const FormsContainer = styled(Box)(({ theme }) => ({
  marginTop: "50px",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap", 
  // Filled with colour instead of a frame
  borderRadius: CARD_RADIUS,
  backgroundColor: theme.palette.colors.caramel,
  overflow: "hidden",
  gap: "10px",
  alignItems: "stretch", 
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "30px",

  },
}));

