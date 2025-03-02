"use client";

import TitleStars from "@/components/TitleStars";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { ImageContainer, ReviewsContainer, SwiperStyled } from "./styled";

function Reviews() {
  const { t } = useTranslation();

  const keys = Array.from({ length: 16 }, (_, i) => i + 1);

  return (
    <ReviewsContainer>
      <TitleStars title={t("home.reviews")} />
      <SwiperStyled
        slidesPerView={4}
        centeredSlides={true}
        pagination={{ type: "bullets", clickable: true }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={2000}
        navigation={true}
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {keys.map((key) => (
          <SwiperSlide
            key={key}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <ImageContainer>
              <Image
                src={`/assets/photos/reviews/review-${key}.webp`}
                alt="review"
                layout="fill"
                objectFit="cover"
                style={{ borderRadius: "15px" }}
              />
            </ImageContainer>
          </SwiperSlide>
        ))}
      </SwiperStyled>
    </ReviewsContainer>
  );
}

export default Reviews;
