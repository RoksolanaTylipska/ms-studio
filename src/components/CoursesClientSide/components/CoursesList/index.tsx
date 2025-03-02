"use client";

import { useTranslation } from "react-i18next";
import { MainContainer, MainTitle } from "./styled";
import Course from "../Course";
import { courses } from "@/constants/courses";

function CoursesList() {
  const { t } = useTranslation();

  return (
    <MainContainer>
      <MainTitle variant="h2">{t("courses.title")}</MainTitle>
      {courses.map((course) => (
        <Course
          key={course.title}
          backgroundColor={course.backgroundColor}
          title={course.title}
          variants={course.variants}
        />
      ))}
    </MainContainer>
  );
}

export default CoursesList;
