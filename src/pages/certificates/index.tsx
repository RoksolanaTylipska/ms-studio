import GalleryClientSide from "@/components/GalleryClientSide";
import { Box } from "@mui/material";

function Certificates() {
  const count = Array.from({ length: 19 }, (_, i) => i + 1);

  return (
    <>
      <Box>
        <GalleryClientSide count={count} path={"/assets/photos/certificates/certificate"} />
      </Box>
    </>
  );
}

export default Certificates;
