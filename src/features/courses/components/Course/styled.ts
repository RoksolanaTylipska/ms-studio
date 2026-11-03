import { Box, Typography, styled } from "@mui/material";
import { fullBleed } from "@/styles/fullBleed";
import { CARD_RADIUS, cardHover } from "@/styles/card";

interface BackgroundColor {
  backgroundColor: string;
}

export const CourseContainer = styled(Box)<BackgroundColor>(
  ({ theme, backgroundColor }) => ({
    backgroundColor:
      backgroundColor === "dark"
        ? theme.palette.colors.caramel
        : theme.palette.colors.beige,
    ...fullBleed(
      backgroundColor === "dark" ? theme.palette.colors.caramel : theme.palette.colors.beige
    ),
    padding: "90px 70px",
    [theme.breakpoints.down("sm")]: {
      padding: "50px 20px",
    },
  })
);

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: "30px",
  marginBottom: "40px",
}));

export const VariantTitle = styled(Typography)(({ theme }) => ({
}));
export const VariantDuration = styled(Typography)(({ theme }) => ({}));

export const VariantContainer = styled(Box)<BackgroundColor>(
  ({ theme, backgroundColor }) => ({
    backgroundColor:
      backgroundColor === "dark"
        ? theme.palette.colors.beige
        : theme.palette.colors.caramel,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "0 0 20px 0",
    width: "100%",
    borderRadius: CARD_RADIUS,
    overflow: "hidden",
    cursor: "pointer",
    ...cardHover,
  })
);

export const Variants = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "30px",
  justifyContent: "center",
  height: "400px",

  margin: "auto",
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
    height: "100%",
  },
}));

export const ImageContainer = styled(Box)(({ theme }) => ({
  height: "70%",
  width: "100%",
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    height: "200px",
  },
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  margin: "auto",
}));
