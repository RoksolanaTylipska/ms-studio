import { Typography, styled } from "@mui/material";

export const GenderTitle = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "end",
  paddingRight: "50px",
  margin: "8px 0px",
  [theme.breakpoints.down("md")]: { 
    padding: "0px",
  },
  [theme.breakpoints.down("sm")]: { 
    padding: "0px",
  },
}));

