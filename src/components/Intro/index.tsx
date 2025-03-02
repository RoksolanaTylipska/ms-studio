"use client";

import { useModalWindowContext } from "@/hooks/useModalWindowContext";
import { Box } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import {
  Description,
  ImageContainer,
  IntroContainer,
  ServicesContainer,
  TextContainer,
  Title,
} from "../Intro/styled";
import CreateBeautyWithLove from "../CreateBeautyWithLove";

function Intro() {
  const { t } = useTranslation();
  const { handleModalWindow } = useModalWindowContext();

  return (
    <ServicesContainer>
      <IntroContainer>
        <ImageContainer>
          <Image
            alt="team photo"
            src={"/assets/photos/services_intro.webp"}
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </ImageContainer>
        <TextContainer>
          <Image
            src="/assets/icons/logo-black.png"
            alt="Logo"
            width={85}
            height={85}
          />
          <Title variant="h2">{t("services.intro.title")}</Title>
          <Description variant="body1">
            {t("services.intro.subtitle")}
          </Description>
          <Button
            children={t("button.bookAppointment")}
            onClick={handleModalWindow}
            type="primary"
            color="dark"
            size="medium"
          />

          <CreateBeautyWithLove />
        </TextContainer>
      </IntroContainer>
    </ServicesContainer>
  );
}

export default Intro;
