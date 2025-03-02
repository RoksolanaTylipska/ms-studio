//@ts-nocheck

"use client";

import { courseDetails } from "@/constants/courseDetails";
import { Typography, useMediaQuery } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  Container,
  Content,
  DayContainer,
  DayTitle,
  Section,
  TitleContainer,
} from "./styled";

function CourseDetails({ course }) {
  const link = useParams();
  const router = useRouter();
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");


  if (!course) {
    router.push("/not-found");
    return null;
  }

  return (
    <Container>
      <Content>
        <TitleContainer>
          <Typography variant="bodyCaveat">{t(course.title)}</Typography> {!isMobile && "|"}
          <Typography variant="bodyCaveat">{t(course.subTitle)}</Typography> {!isMobile && "|"}
          <Typography variant="bodyCaveat">{t(course.duration)}</Typography>
        </TitleContainer>

        {Object.keys({ ...course.theory, ...course.practice }).map((day) => (
          <Section key={day}>
            {course.theory?.[day] && (
              <DayContainer>
                <DayTitle variant="h5">{t(course.theory[day].title)}</DayTitle>
                {Array.isArray(
                  t(course.theory[day].description, { returnObjects: true })
                ) ? (
                  <ul>
                    {t(course.theory[day].description, {
                      returnObjects: true,
                    }).map((topic: string, index: number) => (
                      <li key={index} style={{ paddingBottom: "10px" }}>
                        <Typography variant="body1">- {topic}</Typography>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography variant="body1">
                    {t(course.theory[day].description)}
                  </Typography>
                )}
              </DayContainer>
            )}

            {course.practice?.[day] && (
              <DayContainer>
                <DayTitle variant="h5">
                  {t(course.practice[day].title)}
                </DayTitle>
                {Array.isArray(
                  t(course.practice[day].description, { returnObjects: true })
                ) ? (
                  <ul>
                    {t(course.practice[day].description, {
                      returnObjects: true,
                    }).map((topic: string, index: number) => (
                      <li key={index} style={{ paddingBottom: "10px" }}>
                        <Typography variant="body1">- {topic}</Typography>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography variant="body1">
                    {t(course.practice[day].description)}
                  </Typography>
                )}
              </DayContainer>
            )}
          </Section>
        ))}
        {course.diploma && (
          <Section>
            {Array.isArray(
              t(course.diploma.description, { returnObjects: true })
            ) ? (
              <ul>
                {t(course.diploma.description, { returnObjects: true }).map(
                  (topic: string, index: number) => (
                    <li key={index} style={{ paddingBottom: "10px" }}>
                      <Typography variant="body1">{topic}</Typography>
                    </li>
                  )
                )}
              </ul>
            ) : (
              <Typography variant="body1">
                {t(course.diploma.description)}
              </Typography>
            )}
          </Section>
        )}
      </Content>
    </Container>
  );
}

export default CourseDetails;
