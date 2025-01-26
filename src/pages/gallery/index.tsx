import GalleryClientSide from "@/components/GalleryClientSide";
import { Box } from "@mui/material";

function Gallery() {
  const count = Array.from({ length: 23 }, (_, i) => i + 1);

  return (
    <>
      <Box>
        <GalleryClientSide count={count} title={false} path={"/assets/photos/general/photo"} />

      </Box>
    </>
  );
}

export default Gallery;
