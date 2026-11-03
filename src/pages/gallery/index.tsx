import GalleryClientSide from "@/features/gallery/components/GalleryClientSide";
import { Seo } from "@/components/Seo";

function Gallery() {
  return (
    <>
      <Seo
        title="Галерея студії та робіт майстрів | MS Laser Львів"
        description="Фото студії MS Laser у Львові, нашого обладнання та результатів процедур лазерної епіляції й електроепіляції."
        path="/gallery"
      />
      <GalleryClientSide title={false} path={"ms-studio-gallery/gallery"} />
    </>
  );
}

export default Gallery;
