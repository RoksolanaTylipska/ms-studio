import { styled, keyframes } from "@mui/material/styles";
import { Box } from "@mui/material";
import Link from "next/link";

interface HeaderContainerProps {
  isMobile: boolean;
  isMenuOpen: boolean;
}

export const HeaderContainer = styled('header')<HeaderContainerProps>(({ isMobile, theme}) => ({
  maxWidth: '1440px',
  position: 'fixed',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '20px',
  backgroundColor: theme.palette.colors.beige,
  height: '84px',
  margin: 'auto',
  top: 0,
  left: 0,
  right: 0,
  paddingInline: '77px',
  zIndex: 10,
  [theme.breakpoints.down("sm")]: { 
    backgroundColor: "transparent"
  },
}));

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const MobileMenuButton = styled('img')({
  display: 'block',
  position: 'fixed',
  width: '20px',
  cursor: 'pointer',
  right: '30px',
  top: '30px',
  zIndex: 10,
});

export const MobileLogo = styled('img')({
  position: 'absolute',
  width: '450px',
  left: '-70px',
  bottom: '50px',
  animation: `${fadeIn} 4s ease-out`,
});

export const MobileMenu = styled(Box)<HeaderContainerProps>(({ isMobile, isMenuOpen, theme }) => ({
  display: 'block',
  position: 'absolute',
  gap: '50px',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: isMobile && isMenuOpen ? 'center' : 'unset',
  backgroundColor: theme.palette.colors.beige,
  height: '100vh',
  top: 0,
  left: isMobile ? (isMenuOpen ? '0%' : '100%') : 0,
  right: 0,
  transition: 'ease-out 0.4s',
}));

export const PhoneNumber = styled(Link)({
  color: 'white',
  borderRadius: '5px',
});

export const MobileContainer = styled('a')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: "center",
  justifyContent: "center",
  margin: "50px 0",
  gap: "40px"

});

export const SocialMediaContainer = styled(Box)({
  margin: "auto",
  display: "flex",
  gap: "10px",
  justifyContent: "end",
});

export const LanguageSwitcherContainer = styled(Box)({
  display: "flex", 
  gap: "50px"
});