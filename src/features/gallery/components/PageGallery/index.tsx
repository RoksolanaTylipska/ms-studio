import GalleryModal from "@/features/gallery/components/GalleryModal";
import GalleryTile from "@/features/gallery/components/GalleryTile";
import { CloudinaryImage } from "@/types/image";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

const HEADING_FONT = "'Playfair Display SC', serif";

// Small gallery of one page; the block is left out until photos are assigned in /admin
const PageGallery = ({ title, photos }: { title: string; photos: CloudinaryImage[] }) => {
  const [opened, setOpened] = useState<string | null>(null);

  if (photos.length === 0) return null;

  return (
    <Box component="section" sx={{ maxWidth: 1200, mx: "auto", px: { xs: "20px", sm: "50px" }, py: { xs: 6, md: 9 } }}>
      {opened && <GalleryModal media={opened} alt={title} onClose={() => setOpened(null)} />}
      <Typography
        variant="inherit"
        component="h2"
        sx={{ fontFamily: HEADING_FONT, fontSize: { xs: "28px", md: "38px" }, lineHeight: 1.25, color: "#35302D", textAlign: "center", mb: { xs: 3, md: 5 } }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
          gap: { xs: 1.5, md: 2.5 },
        }}
      >
        {photos.map((img) => (
          <GalleryTile
            key={img.public_id}
            img={img}
            alt={img.description || title}
            sizes="(max-width: 989px) 50vw, 25vw"
            onOpen={() => setOpened(img.secure_url)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default PageGallery;
