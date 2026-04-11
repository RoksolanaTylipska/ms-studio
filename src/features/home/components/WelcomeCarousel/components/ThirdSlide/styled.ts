import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export const SlideContainerThird = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundImage: 'url("/assets/photos/carousel_3.PNG")',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: theme.palette.colors.white,
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0) 100%)',
  },
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  paddingLeft: '8%',
  paddingTop: '80px',
  maxWidth: '600px',
  [theme.breakpoints.down("md")]: {
    paddingLeft: '6%',
    paddingTop: '120px',
    maxWidth: '480px',
  },
  [theme.breakpoints.down("sm")]: {
    paddingLeft: '5%',
    paddingTop: '80px',
    maxWidth: '90%',
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: '90px',
  fontWeight: 400,
  lineHeight: '1',
  textTransform: 'uppercase',
  letterSpacing: '4px',
  marginBottom: '24px',
  [theme.breakpoints.down("md")]: {
    fontSize: '70px',
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: '48px',
    letterSpacing: '2px',
    marginBottom: '16px',
  },
}));

export const Divider = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '2px',
  backgroundColor: theme.palette.colors.white,
  marginBottom: '20px',
  opacity: 0.8,
  [theme.breakpoints.down("sm")]: {
    marginBottom: '14px',
  },
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Comfortaa', sans-serif",
  fontSize: '22px',
  lineHeight: '1.6',
  opacity: 0.9,
  marginBottom: '40px',
  [theme.breakpoints.down("md")]: {
    fontSize: '18px',
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: '14px',
    marginBottom: '28px',
  },
}));
