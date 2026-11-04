import { JsonLd } from "@/components/JsonLd";
import { Seo } from "@/components/Seo";
import GalleryClientSide from "@/features/gallery/components/GalleryClientSide";
import { GALLERY_FOLDERS } from "@/features/gallery/constants";
import { certificatesPageSchema } from "@/features/servicePages/seo";
import { fetchGalleryImages } from "@/lib/galleryImages";
import { GalleryPage } from "@/types/image";
import { Box } from "@mui/material";
import { GetStaticProps } from "next";

function Certificates({ initial }: { initial: GalleryPage }) {
  return (
    <>
      <Seo
        title="Сертифікати майстрів | MS STUDIO LASER Львів"
        description="Сертифікати та дипломи майстрів студії MS STUDIO LASER у Львові з лазерної епіляції, електроепіляції та депіляції."
        path="/certificates"
      />
      <JsonLd id="certificates-schema" data={certificatesPageSchema(initial.resources)} />
      <Box>
        <GalleryClientSide path={GALLERY_FOLDERS.certificates} initial={initial} />
      </Box>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => ({
  props: { initial: await fetchGalleryImages(GALLERY_FOLDERS.certificates) },
  // Certificates added in /admin show up on the site within minutes
  revalidate: 300,
});

export default Certificates;
