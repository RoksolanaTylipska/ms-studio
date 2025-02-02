import TitleStars from "@/components/TitleStars";
import { benefits } from "@/constants/benefits";
import { useMediaQuery } from "@mui/material";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import BenefitItem from "../BenefitItem";
import { BenefitsContainer, BenefitsList, SwiperStyled } from "./styled";

function Benefits() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <BenefitsContainer>
      <TitleStars title={"benefits.title"} />
      {isMobile ? (
        <SwiperStyled
          slidesPerView={1}
          centeredSlides={true}
          pagination={{ type: "bullets", clickable: true }}
          loop={true}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          speed={500}
          navigation={true}
          modules={[Navigation, Pagination, Autoplay]}
        >
          {benefits.map((benefit, index) => (
            <SwiperSlide
              key={index}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <BenefitItem key={index} benefit={benefit} />
            </SwiperSlide>
          ))}
        </SwiperStyled>
      ) : (
        <BenefitsList>
          {benefits.map((benefit, index) => (
            <BenefitItem key={index} benefit={benefit} />
          ))}
        </BenefitsList>
      )}
    </BenefitsContainer>
  );
}

export default Benefits;
