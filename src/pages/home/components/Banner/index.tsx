import Image from "next/image";
import { BannerContainer, ImageContainer } from "./styled";

function Banner() {
  return (
    <BannerContainer>
      {/* <Image
        alt="team"
        src={"/assets/photos/valley-top.png"}
        layout="fill"
        objectFit="contain"
      /> */}

      <ImageContainer>
        <Image
          alt="team"
          src={"/assets/photos/team-1.png"}
          layout="responsive"
          width={16} 
          height={9} 
          style={{position: "absolute", bottom: 0}}
        />
      </ImageContainer>
    </BannerContainer>
  );
}

export default Banner;
