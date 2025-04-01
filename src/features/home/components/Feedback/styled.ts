import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

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
  borderRadius: "10px",
  border: `1px solid ${theme.palette.colors.chocolate}`,
  gap: "10px",
  alignItems: "stretch", 
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "30px",

  },
}));

