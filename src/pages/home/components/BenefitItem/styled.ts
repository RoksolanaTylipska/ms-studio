import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ItemContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.colors.caramel,  
  height: '400px',
  maxWidth: '305px',
  borderRadius: '30px',
  padding: '30px 20px',
  display: 'flex',
  flexDirection: 'column',  
  justifyContent: 'space-between',
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
  margin: '0 auto',
});
