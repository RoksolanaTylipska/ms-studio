import GalleryClientSide from "@/features/gallery/components/GalleryClientSide";
import { JsonLd } from "@/components/JsonLd";
import { Seo } from "@/components/Seo";
import { galleryPageSchema } from "@/features/servicePages/seo";

function Gallery() {
  return (
    <>
      <Seo
        title="Галерея студії та робіт майстрів | MS STUDIO LASER Львів"
        description="Фото студії MS STUDIO LASER у Львові, нашого обладнання та результатів процедур лазерної епіляції й електроепіляції."
        path="/gallery"
      />
      <JsonLd id="gallery-schema" data={galleryPageSchema()} />
      <GalleryClientSide title={false} path={"ms-studio-gallery/gallery"} />
    </>
  );
}

export default Gallery;
