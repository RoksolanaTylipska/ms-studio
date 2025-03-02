import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const StudentsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: theme.palette.colors.caramel,
  marginTop: "85px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
    gap: "20px",
    marginTop: "0px",

  },
}));
