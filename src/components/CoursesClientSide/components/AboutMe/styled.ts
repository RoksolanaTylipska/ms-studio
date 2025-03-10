import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const AboutMeContainer = styled(Box)(({ theme }) => ({
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

export const TextContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "40%",
  margin: "auto",
  gap: "20px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    padding: "25px",
    textAlign: "center",
    
  },
}));


export const Name = styled(Typography)(({ theme }) => ({
  textTransform: "uppercase",
  fontWeight: "light",
  lineHeight: "40px",
  textAlign: "start",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
  },
}));

export const ImageContainer = styled(Box)(({ theme }) => ({
  width: "95%",
  height: "600px",
  right: "0",
  overflow: "hidden",
  position: "absolute", 
  borderRadius: "50% 0% 0% 50%",
  [theme.breakpoints.down("sm")]: {
    height: "400px",
    width: "90%",
  },
}));

export const CreateBeautyContainer = styled(Box)(({ theme }) => ({
  margin: "0px 0px 0px 200px",
}));

export const ImageBackground = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.colors.beige,
  borderRadius: "60% 0% 0% 60%",
  width: "40%",
  height: "600px",
  position: "relative", 
  [theme.breakpoints.down("sm")]: {
    position: "static", 
    width: "90%",
    height: "400px",
    marginLeft: "20px",
  },
}));


