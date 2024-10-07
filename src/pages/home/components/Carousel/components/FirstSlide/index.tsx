"use client";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Discount,
  DiscountNumber,
  DiscountText,
  SlideContainerFirst,
  Title,
} from "./styled";

function FirstSlide() {
  const { t } = useTranslation();

  return (
      <SlideContainerFirst>
        <Title as='h1'>
          {t("services.lazer").split(" ")[0]}{" "}
          <i>{t("services.lazer").split(" ")[1]}</i>
        </Title>
        <Discount>
          <DiscountNumber as="p">-20%</DiscountNumber>
        </Discount>
        <DiscountText as="p">{t("home.carousel.discount")}</DiscountText>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            children={t("button.bookAppointment")}
            type="secondary"
            color="light"
            size="large"
          />
        </div>
      </SlideContainerFirst>
  );
}

export default FirstSlide;
