"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { PhotoContainer, Text } from "./styled";

function Photo() {
  const { t } = useTranslation();

  return (
    <PhotoContainer>
      <Image
        src="/assets/icons/stars-white.svg"
        alt="Filled Stars Icon"
        width={60}
        height={60}
      />
      <Text>{t("home.slogan")}</Text>
      <Image
        src="/assets/icons/stars-white.svg"
        alt="Filled Stars Icon"
        width={60}
        height={60}
      />
    </PhotoContainer>
  );
}

export default Photo;
