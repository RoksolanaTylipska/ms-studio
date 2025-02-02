import GalleryClientSide from "@/components/GalleryClientSide";
import { Box } from "@mui/material";

function Gallery() {
  return (
    <Box>
      <GalleryClientSide title={false} path={"ms-studio-gallery/gallery"} />
    </Box>
  );
}

export default Gallery;
