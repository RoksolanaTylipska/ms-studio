"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import FirstSlide from "./components/FirstSlide";
import SecondSlide from "./components/SecondSlide";
import { SwiperStyled } from "./styled";


function Carousel() {

  return (
    <SwiperStyled
      centeredSlides={true}
      pagination={{ type: "bullets", clickable: true }}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      speed={2000}
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
