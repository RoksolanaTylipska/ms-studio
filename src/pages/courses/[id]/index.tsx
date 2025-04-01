import CourseDetails from "@/features/courses/components/CourseDetails";
import { courseDetails } from "@/features/courses/constants/courseDetails";
import { Course } from "@/features/courses/types/courseDetails";
import { GetStaticPaths, GetStaticProps } from "next";

export default function CourseDetail({ course }: { course: Course }) {
  if (!course) return <h1>Курс не знайдено</h1>;

  return <CourseDetails course={course} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = courseDetails.map((course) => ({
    params: { id: course.link },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const course = courseDetails.find((c) => c.link === params?.id);

  if (!course) return { notFound: true };

  return { props: { course } };
};
