"use client";

import { Course } from "@/features/courses/types/courseDetails";
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
import { useCourseDetails } from "../../hooks/useCourseDetails";

function CourseDetails({ course }: { course: Course }) {
  const router = useRouter();
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { days, renderDayContainer } = useCourseDetails({ course });

  if (!course) {
    router.push("/not-found");
    return null;
  }

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

        <Price variant="bodyCaveat">
          {t("courses.variants.price")}: {course.price}
        </Price>
      </Content>
    </Container>
  );
}

export default CourseDetails;
