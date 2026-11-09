import { videoPoster, videoSource } from "@/features/gallery/constants";
import { modalImageSrc, preloadModalImage } from "@/helpers/cloudinaryLoader";
import { Box, CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ModalContainer, ModalImage } from "./styled";

const isVideo = (media: string) => media.includes("/video/upload/");

// Round button beside the photo; on phones it sits over the photo's edge
const Arrow = ({ side, label, onClick }: { side: "left" | "right"; label: string; onClick: () => void }) => (
  <Box
    component="button"
    type="button"
    aria-label={label}
    onClick={(event) => {
      event.stopPropagation();
      onClick();
    }}
    sx={{
      position: { xs: "absolute", md: "static" },
      [side]: { xs: 12, md: "auto" },
      top: "50%",
      transform: { xs: "translateY(-50%)", md: "none" },
      zIndex: 1,
      flexShrink: 0,
      width: { xs: 40, md: 52 },
      height: { xs: 40, md: 52 },
      borderRadius: "50%",
      border: 0,
      cursor: "pointer",
      display: "grid",
      placeItems: "center",
      backgroundColor: "rgba(241, 234, 229, 0.9)",
      color: "#35302D",
      transition: "background-color .2s",
      "&:hover": { backgroundColor: "#fff" },
    }}
  >
    <svg width="12" height="20" viewBox="0 0 12 20" fill="none" aria-hidden>
      <path
        d={side === "left" ? "M10 2 2 10l8 8" : "M2 2l8 8-8 8"}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Box>
);

const Media = ({ media, alt }: { media: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false);

  return isVideo(media) ? (
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
        src={modalImageSrc(media)}
        alt={alt}
        width={900}
        height={600}
        objectFit="contain"
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </>
  );
};

// Opened photo or video with arrows, keyboard arrows and swipes between items
const GalleryModal = ({
  items,
  index,
  onIndexChange,
  alt,
  onClose,
}: {
  items: string[];
  index: number;
  onIndexChange: (index: number) => void;
  alt: string;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const touchX = useRef<number | null>(null);
  const media = items[index];
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;

  const go = (step: number) => {
    const next = index + step;
    if (next >= 0 && next < items.length) onIndexChange(next);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // The neighbours are ready by the time the arrow is pressed
  useEffect(() => {
    [items[index - 1], items[index + 1]].forEach((item) => item && !isVideo(item) && preloadModalImage(item));
  }, [items, index]);

  if (!media) return null;

  return (
    <ModalContainer
      onClick={onClose}
      onTouchStart={(event) => (touchX.current = event.touches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchX.current === null) return;
        const dx = event.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) go(dx > 0 ? -1 : 1);
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: { md: 3 } }}>
        {hasPrev && <Arrow side="left" label={t("gallery.prev")} onClick={() => go(-1)} />}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Media key={media} media={media} alt={alt} />
        </Box>
        {hasNext && <Arrow side="right" label={t("gallery.next")} onClick={() => go(1)} />}
      </Box>
    </ModalContainer>
  );
};

export default GalleryModal;
