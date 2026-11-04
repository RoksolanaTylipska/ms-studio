import CoursesClientSide from "@/features/courses/components/CoursesClientSide";
import { Seo } from "@/components/Seo";

function Courses() {
  return (
    <>
      <Seo
        title="Курси лазерної епіляції, електроепіляції та депіляції у Львові | MS STUDIO LASER"
        description="Навчання лазерній епіляції, електроепіляції, восковій депіляції та шугарингу у Львові. Теорія, практика на моделях і сертифікат після завершення курсу."
        path="/courses"
      />
      <CoursesClientSide />
    </>
  );
}

export default Courses;
