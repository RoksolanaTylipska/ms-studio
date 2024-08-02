import palette from "@/theme/palette";
import styled from "@emotion/styled";
import { keyframes } from "@mui/material";

interface HeaderContainerProps {
  isMobile: boolean;
  isMenuOpen: boolean;
}

export const HeaderContainer = styled.header<HeaderContainerProps>`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  background-color: ${palette.beige};
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  padding-inline: 70px;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const MobileMenuButton = styled.img`
  display: block;
  position: fixed;
  width: 20px;
  cursor: pointer;
  right: 30px;
  top: 30px;
  z-index: 10;
`;

export const MobileLogo = styled.img`
  position: absolute;
  width: 450px;
  left: -70px;
  bottom: 50px;
  animation: ${fadeIn} 4s ease-out;
`;

export const MobileMenu = styled.div<HeaderContainerProps>`
  display: block;
  position: absolute;
  display: flex;
  gap: 50px;
  flex-direction: column;
  justify-content: start;
  align-items: ${({ isMobile, isMenuOpen }) =>
    isMobile && isMenuOpen && "center"};
  background-color: ${palette.beige};
  height: 100vh;
  top: 0;
  left: ${({ isMobile, isMenuOpen }) =>
    isMobile ? (isMenuOpen ? "0%" : "100%") : 0};
  right: 0;
  transition: ease-out 0.3s;
`;

export const PhoneNumber = styled.a`
  color: white;
  border-radius: 5px;
`;


