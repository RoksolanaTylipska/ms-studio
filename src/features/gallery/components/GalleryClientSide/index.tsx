import { useGallery } from "@/features/gallery/hooks/useGallery";
import { Box, LinearProgress } from "@mui/material";
import { cloudinaryLoader } from "@/helpers/cloudinaryLoader";
import Image from "next/image";
import {
  GalleryContainer,
  ModalContainer,
  ModalImage,
  PhotosContainer,
} from "./styled";
import { TitleStars } from "@/components";

const GalleryClientSide = ({
  title = true,
  path,
}: {
  title?: boolean;
  path: string;
}) => {
  const {
    images,
    loading,
    sentinelRef,
    toggleOpenModal,
    isModalOpen,
    selectedImage,
  } = useGallery(path);

  return (
    <GalleryContainer>
      {isModalOpen && (
        <ModalContainer onClick={() => toggleOpenModal()}>
          {isModalOpen && (
            <ModalContainer onClick={() => toggleOpenModal()}>
              <ModalImage
                loader={cloudinaryLoader}
                sizes="90vw"
                src={selectedImage || ""}
                alt={title ? "Certificate" : "Photo"}
                width={900}
                height={600}
                objectFit="contain"
              />
            </ModalContainer>
          )}
        </ModalContainer>
      )}

      {title && <TitleStars title={"masters.certificates"} />}
      <PhotosContainer>
        {images.map((img, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              width: "100%",
              paddingBottom: "100%",
              borderRadius: "15px",
              overflow: "hidden",
            }}
          >
            <Image
              loader={cloudinaryLoader}
              src={img.secure_url}
              key={img.public_id}
              alt={title ? "Сертифікат майстра MS Laser" : "Фото студії MS Laser"}
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 989px) 33vw, 25vw"
              style={{ objectFit: "cover", cursor: "pointer" }}
              onClick={() => toggleOpenModal(img.secure_url)}
            />
          </Box>
        ))}
        <div ref={sentinelRef} style={{ height: "1px" }} />
      </PhotosContainer>
      {loading && <LinearProgress color="inherit" />}
    </GalleryContainer>
  );
};

export default GalleryClientSide;
