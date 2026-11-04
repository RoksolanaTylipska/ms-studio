import GalleryClientSide from "@/features/gallery/components/GalleryClientSide";
import { JsonLd } from "@/components/JsonLd";
import { Seo } from "@/components/Seo";
import { GALLERY_FOLDERS } from "@/features/gallery/constants";
import { galleryPageSchema } from "@/features/servicePages/seo";
import { fetchGalleryImages } from "@/lib/galleryImages";
import { GalleryPage } from "@/types/image";
import { GetStaticProps } from "next";

function Gallery({ initial }: { initial: GalleryPage }) {
  return (
    <>
      <Seo
        title="Галерея студії та робіт майстрів | MS STUDIO LASER Львів"
        description="Фото студії MS STUDIO LASER у Львові, нашого обладнання та результатів процедур лазерної епіляції й електроепіляції."
        path="/gallery"
      />
      <JsonLd id="gallery-schema" data={galleryPageSchema(initial.resources)} />
      <GalleryClientSide title={false} path={GALLERY_FOLDERS.gallery} initial={initial} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => ({
  props: { initial: await fetchGalleryImages(GALLERY_FOLDERS.gallery) },
  // Photos added in /admin show up on the site within minutes
  revalidate: 300,
});

export default Gallery;
