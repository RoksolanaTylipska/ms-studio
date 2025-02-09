import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const SlideContainerFirst = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundImage: 'url("/assets/photos/carousel_1.png")',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'bottom',
  color: theme.palette.colors.white,
  [theme.breakpoints.down("sm")]: { 
    backgroundImage: 'url("/assets/photos/carousel_1-mobile.webp")',
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  padding: '140px 0 55px',
  fontSize: '100px',
  textAlign: 'center',
  [theme.breakpoints.down("md")]: { 
    padding: '70px 0 120px',
    fontSize: '80px',
  },
  [theme.breakpoints.down("sm")]: { 
    fontSize: '60px',
    lineHeight: "50px"
  },
}));

export const Discount = styled(Box)(({ theme }) => ({
  border: `2px solid ${theme.palette.colors.white}`,
  width: '40%',
  height: '235px',
  backgroundColor: 'rgba(216, 193, 150, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.colors.white,
  fontSize: '3rem',
  margin: 'auto',
  [theme.breakpoints.down("sm")]: { 
    width: '70%',
    height: '160px',
  },
}));

export const DiscountNumber = styled(Typography)(({ theme }) => ({
  fontFamily: '"Prata", serif',
  fontSize: '150px',
  [theme.breakpoints.down("md")]: { 
    fontSize: '50px',
  },
}));

export const DiscountText = styled(Typography)(({ theme }) => ({
  fontFamily: "'Comfortaa', sans-serif",
  textAlign: 'center',
  fontSize: '30px',
  margin: '26px 0 47px',
  [theme.breakpoints.down("md")]: { 
    fontSize: '20px',
  },
}));
