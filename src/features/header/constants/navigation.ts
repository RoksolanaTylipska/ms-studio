import { ROUTES } from "@/constants/routes";
import { Links } from "@/types/links";

export const navLinksLeft: Links[] = [
  { name: "header.home", link: ROUTES.home },
  { name: "header.services", link: ROUTES.services },
  { name: "header.prices", link: ROUTES.prices },
  { name: "header.courses", link: ROUTES.courses },
];

export const navLinksRight: Links[] = [
  { name: "header.gallery", link: ROUTES.gallery },
  { name: "header.contacts", link: ROUTES.contacts },
];

export const navLinks: Links[] = [
  { name: "header.home", link: "/" },
  { name: "header.services", link: ROUTES.services },
  { name: "header.prices", link: ROUTES.prices },
  { name: "header.courses", link: ROUTES.courses },
  { name: "header.gallery", link: ROUTES.gallery },
  { name: "header.contacts", link: ROUTES.contacts },
];
