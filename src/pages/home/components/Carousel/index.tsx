"use client";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import FirstSlide from "../FirstSlide";
import SecondSlide from "../SecondSlide";
import { SwiperStyled } from "./styled";

function Carousel() {
  const { t } = useTranslation();

  return (
    <SwiperStyled
      spaceBetween={30}
      centeredSlides={true}
      pagination={{ type: "bullets", clickable: true }}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      speed={1000}
      navigation={true}
      className="mySwiper"
      modules={[Autoplay, Navigation, Pagination]}
    >
      <SwiperSlide>
        <FirstSlide />
      </SwiperSlide>

      <SwiperSlide>
        <SecondSlide />
      </SwiperSlide>
    </SwiperStyled>
  );
}

export default Carousel;
