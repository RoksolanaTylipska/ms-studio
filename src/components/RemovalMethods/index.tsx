import TitleStars from "@/components/TitleStars";
import { removalMethods } from "@/constants/removalMethods";
import { Box, useMediaQuery } from "@mui/material";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import MethodItem from "../MethodItem";
import {
  RemovalMethodsContainer,
  RemovalMethodsList,
  SwiperStyled,
} from "./styled";
import { useTranslation } from "react-i18next";

function RemovalMethods() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { t } = useTranslation();

  return (
    <RemovalMethodsContainer>
      <TitleStars title={"removalMethods.title"} />
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
          {removalMethods.map((method, index) => (
            <SwiperSlide
              key={index}
              style={{ display: "flex", justifyContent: "center", height: "410px" }}
            >
              <MethodItem key={index} method={method} />
            </SwiperSlide>
          ))}
        </SwiperStyled>
      ) : (
        <RemovalMethodsList>
          {removalMethods.map((method, index) => (
            <MethodItem key={index} method={method} />
          ))}
        </RemovalMethodsList>
      )}
    </RemovalMethodsContainer>
  );
}

export default RemovalMethods;
