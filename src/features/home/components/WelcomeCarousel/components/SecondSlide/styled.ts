import { Box, Typography, styled } from "@mui/material";

interface SlideContainerSecondProps {
  selectedLanguage: string;
}
interface SlideContainerSecondProps {
  selectedLanguage: string;
}
interface ButtonContainerProps {
  isMobile: boolean;
}

export const SlideContainerSecond = styled(Box)(({ theme }) => ({
  width: "90%",
  height: "100%",
  backgroundImage: 'url("/assets/photos/carousel_2.webp")',
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "bottom",
  margin: "auto",
  [theme.breakpoints.down("sm")]: { 
    backgroundImage: 'url("/assets/photos/carousel_2-mobile.webp")',
    width: "100%",
    margin: "0",
  },
}));

export const Wrapper = styled(Box)<SlideContainerSecondProps>(({ selectedLanguage, theme }) => ({
  paddingTop: "140px",
  position: "relative",
  margin: "auto",
  width: selectedLanguage === "en" ? "850px" : "770px",
  [theme.breakpoints.down("sm")]: { 
    paddingTop: "70px",
    width: selectedLanguage === "en" ? "80%" : "90%",
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: "80px",
  margin: "auto",
  textTransform: "uppercase",
  lineHeight: "80px",
  [theme.breakpoints.down("md")]: { 
    fontSize: '60px',
    margin: "10px 0",
  },
  [theme.breakpoints.down("sm")]: { 
    fontSize: '40px',
    lineHeight: "50px",
  },
}));

export const ButtonContainer = styled(Box)<ButtonContainerProps>(({ isMobile }) => ({
  position: isMobile? "static" : "absolute", 
  bottom: 0,
  right: 0 
}));