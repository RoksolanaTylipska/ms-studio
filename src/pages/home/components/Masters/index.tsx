"use client";

import { masters } from "@/constants/masters";
import { CardMedia } from "@mui/material";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import TitleStars from "../../../../components/TitleStars";
import {
  Description,
  MasterCard,
  MastersContainer,
  Name,
  Position,
  SwiperStyled,
  TypographyBox,
} from "./styled";

function Masters() {
  const { t } = useTranslation();

  return (
    <MastersContainer>
      <TitleStars title={t("home.masters")} />

      <SwiperStyled
        slidesPerView={3}
        centeredSlides={true}
        pagination={{ type: "bullets", clickable: true, }}
        loop={true}
        autoplay={{
          delay: 1000,
        }}
        speed={800}
        navigation={true}
        modules={[Navigation, Pagination]}
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
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {masters.map((master, i) => (
          <SwiperSlide
            key={i}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <MasterCard>
              <CardMedia
                component="img"
                image={master.img}
                alt={master.name}
                sx={{
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                  height: "250px",
                }}
              />
              <TypographyBox>
                <Name variant="bodyComfortaa">{master.name}</Name>
                <Position variant="bodyComfortaa">{master.position}</Position>
                {master.description && (
                  <Description variant="bodyComfortaa">
                    "{master.description}"
                  </Description>
                )}
              </TypographyBox>
            </MasterCard>
          </SwiperSlide>
        ))}
      </SwiperStyled>
    </MastersContainer>
  );
}

export default Masters;
