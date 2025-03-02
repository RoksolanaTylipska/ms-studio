
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const Container =  styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "150px 70px",
  backgroundColor: theme.palette.colors.caramel, 
  [theme.breakpoints.down("sm")]: {
    padding: "60px 20px",
  },
}));

export const Content = styled(Box)({
  width: "100%",
  textAlign: "left",
});

export const Section = styled(Box)({
  marginTop: "40px",
});

export const DayContainer = styled(Box)({
  marginTop: "20px",
  padding: "10px",
  borderLeft: "4px solid #A67458", 
});

export const DayTitle = styled(Typography)(({ theme }) => ({
  marginBottom: "10px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "15px",
  },

}));


export const TitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  fontSize: "25px",
  textTransform: "uppercase",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

