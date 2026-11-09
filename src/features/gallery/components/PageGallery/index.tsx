import GalleryModal from "@/features/gallery/components/GalleryModal";
import GalleryTile from "@/features/gallery/components/GalleryTile";
import { CloudinaryImage } from "@/types/image";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const HEADING_FONT = "'Playfair Display SC', serif";

// Phones show three rows of two; the last visible photo opens the rest
const MOBILE_VISIBLE = 6;

// Small gallery of one page; the block is left out until photos are assigned in /admin
const PageGallery = ({ title, photos }: { title: string; photos: CloudinaryImage[] }) => {
  const { t } = useTranslation();
  const [opened, setOpened] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  if (photos.length === 0) return null;

  const collapsed = !expanded && photos.length > MOBILE_VISIBLE;

  return (
    <Box component="section" sx={{ maxWidth: 1200, mx: "auto", px: { xs: "20px", sm: "50px" }, py: { xs: 6, md: 9 } }}>
      {opened !== null && (
        <GalleryModal
          items={photos.map((img) => img.secure_url)}
          index={opened}
          onIndexChange={setOpened}
          alt={photos[opened]?.description || title}
          onClose={() => setOpened(null)}
        />
      )}
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
        {photos.map((img, index) => (
          <Box
            key={img.public_id}
            sx={{
              position: "relative",
              display: collapsed && index >= MOBILE_VISIBLE ? { xs: "none", md: "block" } : "block",
            }}
          >
            <GalleryTile
              img={img}
              alt={img.description || title}
              sizes="(max-width: 989px) 50vw, 25vw"
              onOpen={() => setOpened(index)}
            />
            {collapsed && index === MOBILE_VISIBLE - 1 && (
              <Box
                component="button"
                type="button"
                onClick={() => setExpanded(true)}
                sx={{
                  display: { xs: "grid", md: "none" },
                  placeItems: "center",
                  position: "absolute",
                  inset: 0,
                  border: 0,
                  borderRadius: "15px",
                  cursor: "pointer",
                  backgroundColor: "rgba(53, 48, 45, 0.6)",
                  color: "#fff",
                  fontFamily: "Comfortaa, sans-serif",
                  fontSize: "16px",
                  letterSpacing: "1px",
                }}
              >
                {t("gallery.more")} +{photos.length - MOBILE_VISIBLE + 1}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PageGallery;
