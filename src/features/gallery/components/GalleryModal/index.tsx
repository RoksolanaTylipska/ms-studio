import { videoPoster, videoSource } from "@/features/gallery/constants";
import { cloudinaryLoader } from "@/helpers/cloudinaryLoader";
import { Box } from "@mui/material";
import { ModalContainer, ModalImage } from "./styled";

const GalleryModal = ({ media, alt, onClose }: { media?: string; alt: string; onClose: () => void }) => (
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
      <ModalImage
        loader={cloudinaryLoader}
        sizes="90vw"
        src={media || ""}
        alt={alt}
        width={900}
        height={600}
        objectFit="contain"
      />
    )}
  </ModalContainer>
);

export default GalleryModal;
