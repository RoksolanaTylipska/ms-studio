import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Navigation from "./components/Navigation";
import {
  HeaderContainer,
  MobileLogo,
  MobileMenu,
  MobileMenuButton,
  PhoneNumber,
} from "./styled";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width: 600px)');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <HeaderContainer isMobile={isMobile} isMenuOpen={isMenuOpen}>
        <Box>
          <Link href="/">
            <Image
              src="/assets/icons/logo-gold.png"
              alt="Logo"
              width={70}
              height={70}
            />
          </Link>
        </Box>
        {isMobile ? (
          <>
            <MobileMenuButton
              src={
                isMenuOpen
                  ? "/assets/icons/menu-close.svg"
                  : "/assets/icons/menu-open.svg"
              }
              alt="Menu button"
              onClick={toggleMenu}
            />
            <MobileMenu isMobile={isMobile} isMenuOpen={isMenuOpen}>
              {isMenuOpen && (
                <>
                  <MobileLogo
                    src="/assets/icons/logo-gold_withoutText.png"
                    alt="Logo"
                  />

                  <Box>
                    <Navigation isMobile={isMobile} isMenuOpen={isMenuOpen} />
                  </Box>
                  <LanguageSwitcher />
                </>
              )}
            </MobileMenu>
          </>
        ) : (
          <>
            <Box>
              <Navigation isMobile={isMobile} isMenuOpen={isMenuOpen} />
            </Box>

            <PhoneNumber>
            +38 (098) 030 30 93
            </PhoneNumber>

            <LanguageSwitcher />
          </>
        )}
      </HeaderContainer>
    </>
  );
};

export default Header;
