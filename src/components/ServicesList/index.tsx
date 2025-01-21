import { servicesDetails } from "@/constants/servicesDetails";
import { Box } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { SwiperStyled } from "./styled";

const ServicesList = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ backgroundColor: "#c9ad9b", padding: "50px 0px" }}>
      <SwiperStyled
        slidesPerView={1}
        centeredSlides={true}
        pagination={{ type: "bullets", clickable: true }}
        loop={true}
        speed={2000}
        navigation={true}
        modules={[Navigation, Pagination, Autoplay]}
      >
        {servicesDetails.map(({ src, alt }, i) => (
          <SwiperSlide key={i}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={src}
                alt={alt}
                fill
                style={{
                  objectFit: "contain",
                }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </SwiperStyled>
    </Box>
  );
};

export default ServicesList;
