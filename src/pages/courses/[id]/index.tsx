import { Seo } from "@/components/Seo";
import CourseDetails from "@/features/courses/components/CourseDetails";
import { courseDetails } from "@/features/courses/constants/courseDetails";
import { Course } from "@/features/courses/types/courseDetails";
import { applyPriceSettings } from "@/features/prices/catalog";
import { fetchPriceSettings } from "@/lib/priceOverrides";
import { GetStaticPaths, GetStaticProps } from "next";
import { useTranslation } from "react-i18next";

export default function CourseDetail({ course }: { course: Course }) {
  const { t } = useTranslation();

  if (!course) return <h1>Курс не знайдено</h1>;

  const name = [t(course.title), course.subTitle && t(course.subTitle)]
    .filter(Boolean)
    .join(" — ");

  return (
    <>
      <Seo
        title={`Курс: ${name} у Львові | MS Laser`}
        description={`${name}: навчання у Львові від практикуючих майстрів MS Laser. Тривалість — ${t(course.duration)}. Теорія, практика та сертифікат.`}
        path={`/courses/${course.link}`}
      />
      <CourseDetails course={course} />
    </>
  );
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

  const { catalog } = applyPriceSettings(await fetchPriceSettings());
  // An empty price set in /admin hides the price on the course page
  const price = catalog.courses.find((c) => c.link === course.link)?.price ?? "";

  return {
    props: { course: { ...course, price } },
    // Prices edited in /admin show up on the site within a minute
    revalidate: 60,
  };
};
