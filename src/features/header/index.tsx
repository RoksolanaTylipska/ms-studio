import { navLinks, navLinksLeft, navLinksRight } from "@/features/header/constants/navigation";
import { useModalWindowContext } from "@/hooks/useModalWindowContext";
import { Box, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Navigation from "./components/Navigation";
import {
  HeaderContainer,
  LanguageSwitcherContainer,
  MobileContainer,
  MobileMenu,
  MobileMenuButton,
  SocialMediaContainer,
} from "./styled";
import { Button, SocialMedia } from "@/components";
import { ButtonSize, ButtonType } from "@/types/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { t } = useTranslation();
  const { handleModalWindow } = useModalWindowContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMobile && isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobile, isMenuOpen]);

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
                  <MobileContainer>
                    <Image
                      src="/assets/icons/logo-black.png"
                      alt="Logo"
                      width={85}
                      height={85}
                    />
                    <Navigation navLinks={navLinks} toggleMenu={toggleMenu} />
                    <LanguageSwitcher />
                    <Button
                      children={t("button.bookAppointment")}
                      onClick={handleModalWindow}
                      type={ButtonType.PRIMARY}
                      size={ButtonSize.MEDIUM}
                    />
                    <SocialMediaContainer>
                      <SocialMedia
                        bgColor={"dark"}
                        img={"/assets/icons/instagram-dark.svg"}
                      />
                      <SocialMedia
                        bgColor={"dark"}
                        img={"/assets/icons/tiktok-dark.svg"}
                      />
                    </SocialMediaContainer>
                  </MobileContainer>
                </>
              )}
            </MobileMenu>
          </>
        ) : (
          <>
            <Box>
              <Navigation navLinks={navLinksLeft} />
            </Box>
            <Link href="/" style={{ margin: "auto" }}>
              <Image
                src="/assets/icons/logo-black.png"
                alt="Logo"
                width={85}
                height={85}
              />
            </Link>
            <Box>
              <Navigation navLinks={navLinksRight} />
            </Box>
            <Button
              children={t("button.bookAppointment")}
              onClick={handleModalWindow}
              type={ButtonType.PRIMARY}
              size={ButtonSize.SMALL}
            />

            <LanguageSwitcherContainer>
              <LanguageSwitcher />
            </LanguageSwitcherContainer>
          </>
        )}
      </HeaderContainer>
    </>
  );
};

export default Header;
