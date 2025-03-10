import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled(Box)(({ theme }) => ({
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

export const Note = styled(Typography)(({ theme }) => ({
  width: "50%",
  lineHeight: "1.5",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const Price = styled(Typography)(({ theme }) => ({
  fontSize: "40px",
  display: "block",
  paddingTop: "40px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "30px",
  },
}));
