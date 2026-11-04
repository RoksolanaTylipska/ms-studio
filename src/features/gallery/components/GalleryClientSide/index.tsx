import { useGallery } from "@/features/gallery/hooks/useGallery";
import { Box, LinearProgress } from "@mui/material";
import { cloudinaryLoader } from "@/helpers/cloudinaryLoader";
import Image from "next/image";
import { videoPoster, videoSource } from "@/features/gallery/constants";
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
          {selectedImage?.includes("/video/upload/") ? (
            <Box
              component="video"
              src={videoSource(selectedImage)}
              poster={videoPoster(selectedImage, 1280)}
              controls
              autoPlay
              playsInline
              // Clicks on the player must not close the window
              onClick={(event) => event.stopPropagation()}
              sx={{ maxWidth: "90vw", maxHeight: { xs: "70vh", md: "85vh" }, borderRadius: "15px", backgroundColor: "#000" }}
            />
          ) : (
            <ModalImage
              loader={cloudinaryLoader}
              sizes="90vw"
              src={selectedImage || ""}
              alt={title ? "Certificate" : "Photo"}
              width={900}
              height={600}
              objectFit="contain"
            />
          )}
        </ModalContainer>
      )}

      {title && <TitleStars title={"masters.certificates"} />}
      <PhotosContainer>
        {images.map((img, index) => (
          <Box
            key={img.public_id}
            sx={{
              position: "relative",
              width: "100%",
              paddingBottom: "100%",
              borderRadius: "15px",
              overflow: "hidden",
            }}
          >
            {img.resource_type === "video" ? (
              <Box
                component="button"
                type="button"
                aria-label="Відео студії MS Laser"
                onClick={() => toggleOpenModal(img.secure_url)}
                sx={{ position: "absolute", inset: 0, p: 0, border: 0, cursor: "pointer", background: "none" }}
              >
                <Image
                  unoptimized
                  src={videoPoster(img.secure_url)}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                />
                {/* Play badge */}
                <Box
                  aria-hidden
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    backgroundColor: "rgba(53, 48, 45, 0.55)",
                    display: "grid",
                    placeItems: "center",
                    "&::after": {
                      content: '""',
                      ml: "4px",
                      borderStyle: "solid",
                      borderWidth: "10px 0 10px 16px",
                      borderColor: "transparent transparent transparent #fff",
                    },
                  }}
                />
              </Box>
            ) : (
              <Image
                loader={cloudinaryLoader}
                src={img.secure_url}
                alt={title ? "Сертифікат майстра MS Laser" : "Фото студії MS Laser"}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 989px) 33vw, 25vw"
                style={{ objectFit: "cover", cursor: "pointer" }}
                onClick={() => toggleOpenModal(img.secure_url)}
              />
            )}
          </Box>
        ))}
        <div ref={sentinelRef} style={{ height: "1px" }} />
      </PhotosContainer>
      {loading && <LinearProgress color="inherit" />}
    </GalleryContainer>
  );
};

export default GalleryClientSide;
