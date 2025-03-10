"use client";

import CreateBeautyWithLove from "@/components/CreateBeautyWithLove";
import { Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import {
  AboutMeContainer,
  CreateBeautyContainer,
  ImageBackground,
  ImageContainer,
  Name,
  TextContainer,
} from "./styled";

function AboutMe() {
  const { t } = useTranslation();

  return (
    <AboutMeContainer>
      <TextContainer>
        <Name variant="h3">
          {t("courses.aboutMe.name")}
          <br />
          {t("courses.aboutMe.position")}
        </Name>

        <Typography variant="body">
          {t("courses.aboutMe.description")}
        </Typography>
        <CreateBeautyContainer>
          <CreateBeautyWithLove />
        </CreateBeautyContainer>
      </TextContainer>
      <ImageBackground>
      <ImageContainer>
        <Image
          src="/assets/photos/courses/maria.webp"
          alt="Maria Pavelchuk"
          fill
          objectFit="cover"
        />
      </ImageContainer>
      </ImageBackground>
    </AboutMeContainer>
  );
}

export default AboutMe;
