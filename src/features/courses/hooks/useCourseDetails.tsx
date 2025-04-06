import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { DayContainer, DayTitle } from "../components/CourseDetails/styled";
import { Course, CourseSection } from "../types/courseDetails";

export const useCourseDetails = ({ course }: { course: Course }) => {
  const { t } = useTranslation();

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

  return { days, renderDayContainer };
};
