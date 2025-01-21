"use client";
import i18n from "@/I18n/i18nConfig";
import Button from "@/components/Button";
import { useModalWindowContext } from "@/hooks/useModalWindowContext";
import { useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SlideContainerSecond, Title, Wrapper } from "./styled";
import { useMediaQuery } from "@mui/material";

function SecondSlide() {
  const { t } = useTranslation();
  const { handleModalWindow } = useModalWindowContext();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const selectedlanguage = useMemo(() => {
    if (typeof window !== "undefined") {
      return i18n.language || window.localStorage.i18n;
    }
    return i18n.language;
  }, [i18n.language]);

  return (
    <SlideContainerSecond>
      <Wrapper selectedlanguage={selectedlanguage}>
        <Title as="h1">
          <Trans i18nKey="home.carousel.slogan"></Trans>
        </Title>
        <div style={{ position: isMobile? "static" : "absolute", bottom: 0, right: 0 }}>
          <Button
            children={t("button.bookAppointment")}
            type="secondary"
            color="dark"
            size="large"
            onClick={handleModalWindow}
          />
        </div>
      </Wrapper>
    </SlideContainerSecond>
  );
}

export default SecondSlide;
