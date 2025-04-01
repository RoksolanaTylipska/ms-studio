"use client";
import { useModalWindowContext } from "@/hooks/useModalWindowContext";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  ButtonContainer,
  Discount,
  DiscountNumber,
  DiscountText,
  SlideContainerFirst,
  Title,
} from "./styled";
import { Button } from "@/components";

function FirstSlide() {
  const { t } = useTranslation();
  const { handleModalWindow } = useModalWindowContext();

  return (
    <SlideContainerFirst>
      <Title as="h1">
        {t("services.lazer").split(" ")[0]}{" "}
        <i>{t("services.lazer").split(" ")[1]}</i>
      </Title>
      <Discount>
        <DiscountNumber as="p">-20%</DiscountNumber>
      </Discount>
      <DiscountText as="p">{t("home.carousel.discount")}</DiscountText>
      <ButtonContainer>
        <Button
          children={t("button.bookAppointment")}
          onClick={handleModalWindow}
          type="secondary"
          color="light"
          size="large"
        />
      </ButtonContainer>
    </SlideContainerFirst>
  );
}

export default FirstSlide;
