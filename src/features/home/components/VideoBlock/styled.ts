import { Box, styled } from "@mui/material";

export const VideoContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  margin: "auto",
  width: "80%",
  marginTop: "100px",
  [theme.breakpoints.down("md")]: { 
    width: "90%",
  },
  [theme.breakpoints.down("sm")]: { 
    width: "90%",
  },
}));
