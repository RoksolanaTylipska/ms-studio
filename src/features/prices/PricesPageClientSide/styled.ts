import { Box, styled } from "@mui/material";
import { fullBleed } from "@/styles/fullBleed";

export const PricesContainer = styled(Box)(({ theme }) => ({ 
  height: "100%",
  width: "100%",
  minHeight: "600px",
  paddingTop: "50px",
  backgroundColor: theme.palette.colors.caramel,
  ...fullBleed(theme.palette.colors.caramel),
  [theme.breakpoints.down("md")]: {
    paddingTop: "10px",
  },
}));
