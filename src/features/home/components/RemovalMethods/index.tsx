import { removalMethods } from "@/features/home/constants/removalMethods";
import { useMediaQuery } from "@mui/material";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import MethodItem from "./components/MethodItem";
import {
  RemovalMethodsContainer,
  RemovalMethodsList,
  SwiperStyled,
} from "./styled";
import { TitleStars } from "@/components";

function RemovalMethods() {
  const isMobile = useMediaQuery("(max-width: 768px)");

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
              style={{
                display: "flex",
                justifyContent: "center",
                height: "410px",
              }}
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
