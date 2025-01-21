import { Box, styled } from "@mui/material";

export const TitleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  margin: 'auto',
  [theme.breakpoints.down("md")]: {
    width: "80%",
  },

}));