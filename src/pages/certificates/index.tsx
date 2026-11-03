import { Seo } from "@/components/Seo";
import GalleryClientSide from "@/features/gallery/components/GalleryClientSide";
import { Box } from "@mui/material";

function Certificates() {
  return (
    <>
      <Seo
        title="Сертифікати майстрів | MS Laser Львів"
        description="Сертифікати та дипломи майстрів студії MS Laser у Львові з лазерної епіляції, електроепіляції та депіляції."
        path="/certificates"
      />
      <Box>
        <GalleryClientSide path={"ms-studio-gallery/certificates"} />
      </Box>
    </>
  );
}

export default Certificates;
