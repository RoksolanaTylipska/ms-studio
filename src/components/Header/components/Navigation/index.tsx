import * as React from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Links } from "../../../../types";
import { NavItem, NavList } from "./styled";
import Link from "next/link";

interface NavProps {
  isMenuOpen: boolean;
  isMobile: boolean;
}

const navLinks: Links[] = [
  { name: "header.about", link: "about" },
  { name: "header.services", link: "services" },
  { name: "header.prices", link: "prices" },
  { name: "header.courses", link: "courses" },
  { name: "header.gallery", link: "gallery" },
  { name: "header.reviews", link: "reviews" },
  { name: "header.contacts", link: "contacts" },
];

const Navigation = memo(({ isMenuOpen, isMobile }: NavProps) => {
  const { t } = useTranslation();

  return (
    <NavList>
      {React.Children.toArray(
        navLinks.map((link: Links) => (
          <NavItem>
            <Link href={`/${link.link}`}>{t(link.name)}</Link>
          </NavItem>
        ))
      )}
    </NavList>
  );

  
});

export default Navigation;
