"use client";

import i18n from "@/I18n/i18nConfig";
import { TitleStars } from "@/components";
import { ROUTES } from "@/constants/routes";
import { FirebaseCollection } from "@/helpers/addFirebaseData";
import useGetFirebaseDta from "@/hooks/useGetFirebaseData";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { getSortedMasters } from "./helpers/getSortedMasters";
import {
  CertificatesContainer,
  CertificatesText,
  Description,
  ImageContainer,
  MasterCard,
  MastersContainer,
  Name,
  Position,
  SwiperStyled,
  TypographyBox,
} from "./styled";
import { Master } from "./types/masters";

function Masters() {
  const { t } = useTranslation();
  const locale = i18n.language;
  const { data: masters } = useGetFirebaseDta<Master>(
    FirebaseCollection.MASTERS
  );

  const sortedMasters = useMemo(() => getSortedMasters(masters), [masters]);

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
        speed={500}
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
        {sortedMasters.map((master, i) => (
          <SwiperSlide
            key={i}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <MasterCard>
              <ImageContainer>
                <Image
                  src={master.img}
                  alt={master.name[locale]}
                  fill
                  style={{
                    objectFit: "cover",
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                    objectPosition: "top",
                  }}
                />
              </ImageContainer>
              <TypographyBox>
                <Name variant="bodyComfortaa">{master.name[locale]}</Name>
                <Position variant="bodyComfortaa">
                  {master.position[locale]}
                </Position>
                {master.description && (
                  <Description variant="bodyComfortaa">
                    "{master.description[locale]}"
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
