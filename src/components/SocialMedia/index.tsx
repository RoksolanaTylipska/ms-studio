import Image from "next/image";
import { SocialMediaCircle } from "./styled";

const SocialMedia = ({ img }: { img: string }) => {
  return (
    <SocialMediaCircle>
      <Image src={img} alt="Logo" width={25} height={25} />
    </SocialMediaCircle>
  );
};

export default SocialMedia;
