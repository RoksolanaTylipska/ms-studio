"use client";

import Button from "@/components/Button";
import { Course as CourseType } from "@/types/courses";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import {
  ButtonContainer,
  CourseContainer,
  ImageContainer,
  Title,
  VariantContainer,
  VariantDuration,
  VariantTitle,
  Variants,
} from "./styled";
import { useModalWindowContext } from "@/hooks/useModalWindowContext";
import { useRouter } from "next/router";

function Course({ title, variants, backgroundColor }: CourseType) {
  const { t } = useTranslation();
  const { handleModalWindow } = useModalWindowContext();
  const router = useRouter();

  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleMoreDetails = (link: string) => {
    if (link) {
      router.push(`/courses/${link}`)
      return
    }
    handleModalWindow();
  };

  return (
    <CourseContainer backgroundColor={backgroundColor}>
      <Title variant="h3">{t(title)}</Title>
      <Variants>
        {variants.map((variant) => (
          <VariantContainer
            key={variant.title}
            backgroundColor={backgroundColor}
          >
            <ImageContainer>
              <Image
                src={variant.img}
                fill
                alt={t(variant.title)}
                objectFit="cover"
                style={{ borderRadius: "50px 50px 0px 0px" }}
              />
            </ImageContainer>

            <VariantTitle variant="h4">{t(variant.title)}</VariantTitle>
              <VariantDuration>{variant.duration ? t(variant.duration) : "\u00A0"}</VariantDuration>
            
            <ButtonContainer>
              <Button
                children={t("courses.more")}
                type="primary"
                size="medium"
                onClick={() => handleMoreDetails(variant.link || "")}
              />
            </ButtonContainer>
          </VariantContainer>
        ))}
      </Variants>
    </CourseContainer>
  );
}

export default Course;
