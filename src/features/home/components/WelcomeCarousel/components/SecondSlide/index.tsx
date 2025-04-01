"use client";
import { useModalWindowContext } from "@/hooks/useModalWindowContext";
import { Trans, useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ButtonContainer, SlideContainerSecond, Title, Wrapper } from "./styled";
import { useMediaQuery } from "@mui/material";
import { Button } from "@/components";
import { useMemo } from "react";

function SecondSlide() {
  const { t, i18n} = useTranslation();
  const { handleModalWindow } = useModalWindowContext();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const selectedLanguage = i18n.language

  return (
    <SlideContainerSecond>
      <Wrapper selectedLanguage={selectedLanguage}>
        <Title as="h1">
          <Trans i18nKey="home.carousel.slogan"></Trans>
        </Title>
        <ButtonContainer isMobile={isMobile}>
          <Button
            children={t("button.bookAppointment")}
            type="secondary"
            color="dark"
            size="large"
            onClick={handleModalWindow}
          />
        </ButtonContainer>
      </Wrapper>
    </SlideContainerSecond>
  );
}

export default SecondSlide;
