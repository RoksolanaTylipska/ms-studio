import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FAQContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.colors.caramel,  
  padding: '100px 75px 120px;',
  height: "auto",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "80px"
}));