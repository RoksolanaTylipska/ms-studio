import { useGallery } from "@/features/gallery/hooks/useGallery";
import { LinearProgress, Typography } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/constants/routes";
import GalleryModal from "@/features/gallery/components/GalleryModal";
import GalleryTile from "@/features/gallery/components/GalleryTile";
import { PHOTO_RIGHTS_ID } from "@/features/gallery/constants";
import { GalleryContainer, PhotosContainer } from "./styled";
import { TitleStars } from "@/components";
import { GalleryPage } from "@/types/image";

const GalleryClientSide = ({
  title = true,
  path,
  initial,
}: {
  title?: boolean;
  path: string;
  initial?: GalleryPage;
}) => {
  const { t } = useTranslation();
  const {
    images,
    loading,
    sentinelRef,
    toggleOpenModal,
    isModalOpen,
    selectedImage,
  } = useGallery(path, initial);

  return (
    <GalleryContainer>
      {isModalOpen && (
        <GalleryModal media={selectedImage} alt={title ? "Certificate" : "Photo"} onClose={() => toggleOpenModal()} />
      )}

      <TitleStars title={title ? "masters.certificates" : "header.gallery"} component="h1" />
      <PhotosContainer>
        {images.map((img, index) => (
          <GalleryTile
            key={img.public_id}
            img={img}
            alt={img.description || (title ? "Сертифікат майстра MS STUDIO LASER" : "Фото студії MS STUDIO LASER")}
            sizes="(max-width: 767px) 100vw, (max-width: 989px) 33vw, 25vw"
            onOpen={() => toggleOpenModal(img.secure_url)}
          />
        ))}
        <div ref={sentinelRef} style={{ height: "1px" }} />
      </PhotosContainer>
      {loading && <LinearProgress color="inherit" />}
      {/* The license link in the photos' structured data points here */}
      <Typography id={PHOTO_RIGHTS_ID} variant="bodyComfortaa" component="p" sx={{ mt: 5, fontSize: "13px", textAlign: "center" }}>
        {t("footer.photoRights")} <Link href={ROUTES.contacts}>{t("footer.photoRightsContact")}</Link>
      </Typography>
    </GalleryContainer>
  );
};

export default GalleryClientSide;
