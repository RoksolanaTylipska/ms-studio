"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { PhotoContainer, Text, TextContainer } from "./styled";
import { useMediaQuery } from "@mui/material";

function Photo() {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <PhotoContainer>
      <TextContainer>
      <Image
        src="/assets/icons/stars-white.svg"
        alt="Filled Stars Icon"
        width={isMobile ? 40 :60}
        height={isMobile ? 40 :60}
      />
      <Text>{t("home.slogan")}</Text>
      <Image
        src="/assets/icons/stars-white.svg"
        alt="Filled Stars Icon"
        width={isMobile ? 40 :60}
        height={isMobile ? 40 :60}
      />
      </TextContainer>
    </PhotoContainer>
  );
}

export default Photo;
