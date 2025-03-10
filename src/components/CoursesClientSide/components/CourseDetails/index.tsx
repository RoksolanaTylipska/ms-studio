"use client";

import { Course, CourseSection } from "@/types/courseDetails";
import { Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  Container,
  Content,
  DayContainer,
  DayTitle,
  Note,
  Price,
  Section,
  TitleContainer,
} from "./styled";

function CourseDetails({ course: course }: { course: Course }) {
  const router = useRouter();
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (!course) {
    router.push("/not-found");
    return null;
  }

  const renderDayContainer = (data: CourseSection) => {
    const title = t(data.title);
    const description = t(data.description, { returnObjects: true });

    if (
      !title ||
      title.trim() === "" ||
      !description ||
      (Array.isArray(description) && description.length === 0)
    ) {
      return null;
    }

    return (
      <DayContainer>
        <DayTitle variant="h5">{title}</DayTitle>
        {Array.isArray(description) && (
          <ul>
            {description.map((topic, index) => (
              <li key={index} style={{ paddingBottom: "10px" }}>
                <Typography variant="body1">- {topic}</Typography>
              </li>
            ))}
          </ul>
        )}
      </DayContainer>
    );
  };

  const days = Array.from(
    new Set([
      ...Object.keys(course.theory || {}),
      ...Object.keys(course.practice || {}),
    ])
  );

  return (
    <Container>
      <Content>
        <TitleContainer>
          <Typography variant="bodyCaveat">{t(course.title)}</Typography>{" "}
          {course?.subTitle && (
            <>
              {!isMobile && "|"}
              <Typography variant="bodyCaveat">
                {t(course.subTitle)}
              </Typography>{" "}
            </>
          )}
          {!isMobile && "|"}
          <Typography variant="bodyCaveat">{t(course.duration)}</Typography>
        </TitleContainer>

        {days.map((day) => {
          const theoryDay = course.theory?.[day];
          const practiceDay = course.practice?.[day];

          const theoryContent = theoryDay && renderDayContainer(theoryDay);
          const practiceContent =
            practiceDay && renderDayContainer(practiceDay);

          if (!theoryContent && !practiceContent) return null;

          return (
            <Section key={day}>
              {theoryContent}
              {practiceContent}
            </Section>
          );
        })}

        {course.diploma && renderDayContainer(course.diploma)}

        {course.note && (
          <DayContainer>
            <Note variant="body1">{t(course?.note)}</Note>{" "}
          </DayContainer>
        )}

        <Price variant="bodyCaveat">{t("courses.variants.price")}: {course.price}</Price>
      </Content>
    </Container>
  );
}

export default CourseDetails;
