import { videoPoster, videoSource } from "@/features/gallery/constants";
import { modalImageSrc } from "@/helpers/cloudinaryLoader";
import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";
import { ModalContainer, ModalImage } from "./styled";

const GalleryModal = ({ media, alt, onClose }: { media?: string; alt: string; onClose: () => void }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <ModalContainer onClick={onClose}>
      {media?.includes("/video/upload/") ? (
        <Box
          component="video"
          src={videoSource(media)}
          poster={videoPoster(media, 1280)}
          controls
          autoPlay
          playsInline
          // Clicks on the player must not close the window
          onClick={(event) => event.stopPropagation()}
          sx={{ maxWidth: "90vw", maxHeight: { xs: "70vh", md: "85vh" }, borderRadius: "15px", backgroundColor: "#000" }}
        />
      ) : (
        <>
          {!loaded && <CircularProgress aria-label="Завантаження" sx={{ position: "absolute", color: "#fff" }} />}
          <ModalImage
            unoptimized
            src={modalImageSrc(media || "")}
            alt={alt}
            width={900}
            height={600}
            objectFit="contain"
            onLoad={() => setLoaded(true)}
            style={{ opacity: loaded ? 1 : 0 }}
          />
        </>
      )}
    </ModalContainer>
  );
};

export default GalleryModal;
