import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ItemContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.colors.caramel,  
  height: '400px',
  borderRadius: '30px',
  padding: '30px 20px',
  width: "300px",
  display: 'flex',
  flexDirection: 'column',  
  justifyContent: 'space-between',
  [theme.breakpoints.down("sm")]: {
    height: '380px',
  },
}));

export const ItemDescription = styled(Box)(({ theme }) => ({
  paddingTop: '16px',
  fontFamily: "'Comfortaa', sans-serif",
  fontSize: '14px',
  color: theme.palette.colors.latte,
  lineHeight: '24px',
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