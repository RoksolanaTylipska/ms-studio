"use client";
import { useModalWindowContext } from "@/hooks/useModalWindowContext";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ContentWrapper, Divider, SlideContainerThird, Subtitle, Title } from "./styled";
import { Button } from "@/components";
import { ButtonColor, ButtonSize, ButtonType } from "@/types/button";

function ThirdSlide() {
  const { t } = useTranslation();
  const { handleModalWindow } = useModalWindowContext();

  return (
    <SlideContainerThird>
      <ContentWrapper>
        <Title as="h1">{t("services.endosphere")}</Title>
        <Divider />
        <Subtitle as="p">{t("home.carousel.endosphere_subtitle")}</Subtitle>
        <Button
          children={t("button.bookAppointment")}
          onClick={handleModalWindow}
          type={ButtonType.SECONDARY}
          color={ButtonColor.LIGHT}
          size={ButtonSize.LARGE}
        />
      </ContentWrapper>
    </SlideContainerThird>
  );
}

export default ThirdSlide;
