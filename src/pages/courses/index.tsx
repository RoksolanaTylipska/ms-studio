import CoursesClientSide from "@/features/courses/components/CoursesClientSide";
import { Seo } from "@/components/Seo";
import PageGallery from "@/features/gallery/components/PageGallery";
import { fetchPagePhotos } from "@/lib/galleryImages";
import { CloudinaryImage } from "@/types/image";
import { GetStaticProps } from "next";
import { useTranslation } from "react-i18next";

function Courses({ photos }: { photos: CloudinaryImage[] }) {
  const { t } = useTranslation();

  return (
    <>
      <Seo
        title="Курси лазерної епіляції, електроепіляції та депіляції у Львові | MS STUDIO LASER"
        description="Навчання лазерній епіляції, електроепіляції, восковій депіляції та шугарингу у Львові. Теорія, практика на моделях і сертифікат після завершення курсу."
        path="/courses"
      />
      <CoursesClientSide />
      <PageGallery title={t("courses.photosTitle")} photos={photos} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => ({
  props: { photos: await fetchPagePhotos("courses") },
  // Photos added in /admin show up on the site within minutes
  revalidate: 300,
});

export default Courses;
