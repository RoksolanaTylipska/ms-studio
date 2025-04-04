import Link from "next/link";
import * as React from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Links } from "@/types/links";
import { NavItem, NavList } from "./styled";

interface NavProps {
  navLinks: { name: string; link: string }[];
  toggleMenu?: () => void;
}

const Navigation = memo(({ navLinks, toggleMenu }: NavProps) => {
  const { t } = useTranslation();

  return (
    <NavList>
      {React.Children.toArray(
        navLinks.map((link: Links) => (
          <NavItem>
            <Link
              onClick={() => {
                if (toggleMenu) toggleMenu();
              }}
              href={`${link.link}`}
            >
              {t(link.name)}
            </Link>
          </NavItem>
        ))
      )}
    </NavList>
  );
});

export default Navigation;
