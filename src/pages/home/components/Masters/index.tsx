"use client";

import { masters } from "@/constants/masters";
import { ROUTES } from "@/constants/routes";
import { CardMedia } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import TitleStars from "../../../../components/TitleStars";
import {
  CertificatesContainer,
  Description,
  MasterCard,
  MastersContainer,
  Name,
  Position,
  SwiperStyled,
  TypographyBox,
  CertificatesText
} from "./styled";

function Masters() {
  const { t } = useTranslation();

  return (
    <MastersContainer>
      <TitleStars title={t("masters.title")} />

      <SwiperStyled
        slidesPerView={3}
        centeredSlides={true}
        pagination={{ type: "bullets", clickable: true }}
        loop={true}
        autoplay={{
          delay: 7000,
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
                  height: "240px",
                }}
              />
              <TypographyBox>
                <Name variant="bodyComfortaa">{t(`${master.name}`)}</Name>
                <Position variant="bodyComfortaa">{t(`${master.position}`)}</Position>
                {master.description && (
                  <Description variant="bodyComfortaa">
                    "{t(`${master.description}`)}"
                  </Description>
                )}
              </TypographyBox>
            </MasterCard>
          </SwiperSlide>
        ))}
      </SwiperStyled>
      <CertificatesContainer>
        <Link href={ROUTES.certificates}>
          <CertificatesText variant="bodyCaveat">
            {t("masters.goToCertificates")}
          </CertificatesText>
        </Link>
      </CertificatesContainer>
    </MastersContainer>
  );
}

export default Masters;
