import { navLinks, navLinksLeft, navLinksRight } from "@/constants/navigation";
import { Box, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Navigation from "./components/Navigation";
import { HeaderContainer, MobileMenu, MobileMenuButton } from "./styled";
import { useModalWindowContext } from "@/hooks/useModalWindowContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { t } = useTranslation();
  const { handleModalWindow } = useModalWindowContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <HeaderContainer isMobile={isMobile} isMenuOpen={isMenuOpen}>
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
                  <Box>
                    <Navigation navLinks={navLinks} />
                  </Box>
                  <LanguageSwitcher />
                </>
              )}
            </MobileMenu>
          </>
        ) : (
          <>
            <Box>
              <Navigation navLinks={navLinksLeft} />
            </Box>
            <Box sx={{ margin: "auto" }}>
              <Link href="/">
                <Image
                  src="/assets/icons/logo-black.png"
                  alt="Logo"
                  width={85}
                  height={85}
                />
              </Link>
            </Box>
            <Box>
              <Navigation navLinks={navLinksRight} />
            </Box>
            <Button
              children={t("button.bookAppointment")}
              onClick={handleModalWindow}
              type="primary"
              size = "medium"
            />

            <div style={{ display: "flex", gap: "50px" }}>
              <LanguageSwitcher />
            </div>
          </>
        )}
      </HeaderContainer>
    </>
  );
};

export default Header;
