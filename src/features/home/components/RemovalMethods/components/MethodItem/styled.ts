import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CARD_RADIUS } from "@/styles/card";

export const ItemContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.colors.caramel,  
  height: '500px',
  borderRadius: CARD_RADIUS,
  padding: '30px 19px',
  width: "300px",
  display: 'flex',
  flexDirection: 'column',  
  justifyContent: 'space-between',
  transition: 'transform .25s, box-shadow .25s',
  // Phones have no hover: the card answers to the tap instead
  '&:active': {
    transform: 'scale(1.03)',
  },
  '@media (hover: hover)': {
    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow: '0 16px 44px rgba(53, 48, 45, 0.12)',
    },
  },
  [theme.breakpoints.down("sm")]: {
    height: '460px',
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

// Same "more" link as on the /services cards
export const MoreButton = styled('span')({
  alignSelf: 'flex-end',
  fontFamily: "'Comfortaa', sans-serif",
  fontSize: '13px',
  color: '#83694E',
});

export const MethodTitle = styled(Typography)({
  height: '70px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  lineHeight: '30px',

});

