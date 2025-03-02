import { GetStaticPaths, GetStaticProps } from "next";
import { courseDetails } from "@/constants/courseDetails";
import CourseDetails from "@/components/CoursesClientSide/components/CourseDetails";
import { Course } from "@/types/courseDetails";

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
