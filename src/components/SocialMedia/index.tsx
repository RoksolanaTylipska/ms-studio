import Image from "next/image";
import { SocialMediaCircle } from "./styled";
import Link from "next/link";

export const SocialMedia = ({ img, bgColor }: { img: string, bgColor?: string }) => {
  const instagram = img.includes("instagram")

  const path = instagram ? "https://www.instagram.com/ms_studio_laser?igsh=MXJtbXl1NHV1eGVnZQ==" : "https://www.tiktok.com/@ms_studio_epil?_t=ZM-8tEZna2ap42"

  return (
    <Link style={{cursor: "pointer"}} href={path}>
     <SocialMediaCircle bgColor={bgColor}>
      <Image src={img} alt="Logo" width={25} height={25} />
    </SocialMediaCircle>
    </Link>
   
  );
};

