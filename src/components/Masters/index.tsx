"use client";

// import { masters } from "@/constants/masters";
import i18n from "@/I18n/i18nConfig";
import { ROUTES } from "@/constants/routes";
import { db } from "@/lib/firebase";
import { Master } from "@/types/masters";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import TitleStars from "../TitleStars";
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

function Masters() {
  const { t } = useTranslation();
  const locale = i18n.language;
  const [masters, setMasters] = useState<null | Master[]>(null);

  useEffect(() => {
    const fetchMasters = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "masters"));
        const fetchedMasters = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Master[];
        setMasters(fetchedMasters);
      } catch (error) {
        console.error("Error fetching masters: ", error);
      }
    };

    fetchMasters();
  }, []);

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
        {masters &&
          [...masters]
            .sort((a, b) => {
              const priorityA = a.priority ?? Infinity;
              const priorityB = b.priority ?? Infinity;
              return priorityA - priorityB;
            })
            .map((master, i) => (
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
