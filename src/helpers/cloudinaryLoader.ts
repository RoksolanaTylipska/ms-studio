import { ImageLoaderProps } from "next/image";

// Lets Cloudinary's CDN resize and compress images (f_auto picks webp/avif),
// so the multi-megabyte originals never pass through the Next.js image optimizer.
export const cloudinaryLoader = ({ src, width, quality }: ImageLoaderProps) =>
  src.replace(
    "/image/upload/",
    `/image/upload/w_${width},c_limit,f_auto,q_${quality || "auto"}/`
  );

// One size for the opened photo: a much lighter file than the 3840px a retina
// screen asks for, and every visitor shares the version cached by the CDN
export const modalImageSrc = (src: string) => cloudinaryLoader({ src, width: 1600 });

// Starts loading the opened version before the click lands
export const preloadModalImage = (src: string) => {
  document.createElement("img").src = modalImageSrc(src);
};
