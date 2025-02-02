import { useGallery } from "@/hooks/useGallery";
import { Box, LinearProgress } from "@mui/material";
import Image from "next/image";
import TitleStars from "../TitleStars";
import {
  GalleryContainer,
  ModalContainer,
  ModalImage,
  PhotosContainer,
} from "./styled";

const GalleryClientSide = ({ title = true, path }: { title?: boolean, path: string }) => {
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
              src={img.secure_url}
              key={img.public_id}
              alt={`Gallery Image`}
              layout="fill"
              objectFit="cover"
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
