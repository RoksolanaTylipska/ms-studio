import { ImageLoaderProps } from "next/image";

// Lets Cloudinary's CDN resize and compress images (f_auto picks webp/avif),
// so the multi-megabyte originals never pass through the Next.js image optimizer.
export const cloudinaryLoader = ({ src, width, quality }: ImageLoaderProps) =>
  src.replace(
    "/image/upload/",
    `/image/upload/w_${width},c_limit,f_auto,q_${quality || "auto"}/`
  );
