import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ItemContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.colors.caramel,  
  height: '460px',
  borderRadius: '30px',
  padding: '30px 19px',
  width: "300px",
  display: 'flex',
  flexDirection: 'column',  
  justifyContent: 'space-between',
  [theme.breakpoints.down("sm")]: {
    height: '420px',
  },
}));

export const ItemDescription = styled(Box)(({ theme }) => ({
  paddingTop: '16px',
  fontFamily: "'Comfortaa', sans-serif",
  fontSize: '13px',
  color: theme.palette.colors.latte,
  lineHeight: '20px',
  textAlign: 'center',
}));

export const ItemImageWrapper = styled(Box)({
  position: 'relative', 
  width: '150px', 
  height: '150px', 
  margin: '0 auto',
  borderRadius: '50%',
  overflow: 'hidden', 
});

export const MethodTitle = styled(Typography)({
  height: '70px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  lineHeight: '30px',

});

