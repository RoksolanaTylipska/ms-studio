import Link from "next/link";
import * as React from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Links } from "../../../../types";
import { NavItem, NavList } from "./styled";

interface NavProps {
  navLinks: { name: string; link: string }[];
}

const Navigation = memo(({ navLinks }: NavProps) => {
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
