"use client";
import Button from "@/components/Button";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SlideContainerSecond, Title, Wrapper } from "./styled";
import { Trans } from "react-i18next";
import { useMemo } from "react";
import i18n from "@/I18n/i18nConfig";
import { useModalWindowContext } from "@/hooks/useModalWindowContext";

function SecondSlide() {
  const { t } = useTranslation();
  const { handleModalWindow } = useModalWindowContext();

  const selectedlanguage = useMemo(() => {
    if (typeof window !== "undefined") {
      return i18n.language || window.localStorage.i18n;
    }
    return i18n.language;
  }, [i18n.language]);

  return (
    <SlideContainerSecond>
      <Wrapper selectedlanguage={selectedlanguage}>
      <Title>
      <Trans i18nKey="home.carousel.slogan">
            Твоя територія <i>гладкості</i>
          </Trans>
          </Title>
      <div style={{position: "absolute", bottom: 0, right: 0}}>
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
