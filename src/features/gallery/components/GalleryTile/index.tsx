import { videoPoster } from "@/features/gallery/constants";
import { cloudinaryLoader } from "@/helpers/cloudinaryLoader";
import { CloudinaryImage } from "@/types/image";
import { Box } from "@mui/material";
import Image from "next/image";

const GalleryTile = ({
  img,
  alt,
  sizes,
  onOpen,
}: {
  img: CloudinaryImage;
  alt: string;
  sizes: string;
  onOpen: () => void;
}) => (
  <Box
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
        aria-label={img.description || "Відео студії MS STUDIO LASER"}
        onClick={onOpen}
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
        alt={alt}
        fill
        sizes={sizes}
        style={{ objectFit: "cover", cursor: "pointer" }}
        onClick={onOpen}
      />
    )}
  </Box>
);

export default GalleryTile;
