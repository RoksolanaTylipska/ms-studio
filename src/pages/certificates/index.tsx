import Gallery from "@/components/Gellery";
import { Box } from "@mui/material";

function Certificates() {
  const images = Array.from({ length: 19 }, (_, i) => i + 1);

  return (
    <>
      <Box>
        <Gallery images={images} />
      </Box>
    </>
  );
}

export default Certificates;
