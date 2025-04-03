"use client";

import { Course as CourseType } from "@/features/courses/types/courses";
import { useModalWindowContext } from "@/hooks/useModalWindowContext";
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
import { Button } from "@/components";
import { useCourse } from "../../hooks/useCourse";

function Course({ title, variants, backgroundColor }: CourseType) {
  const { t } = useTranslation();
  const { handleModalWindow } = useModalWindowContext();
  const { handleMoreDetails } = useCourse({ handleModalWindow });

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
            <VariantDuration>
              {variant.duration ? t(variant.duration) : "\u00A0"}
            </VariantDuration>

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
