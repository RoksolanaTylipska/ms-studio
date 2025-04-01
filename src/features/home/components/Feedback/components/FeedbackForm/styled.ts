import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Form = styled(Box)(({ theme }) => ({
  padding: "20px",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "25px",
}));


export const RatingContainer = styled(Box)(({ theme }) => ({
  display: "flex",

  alignItems: "center",
  gap: 2,
  marginLeft: "10px",
}));
