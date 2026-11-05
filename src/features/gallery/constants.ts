// Cloudinary folders behind the public galleries; the API only works with these
export const GALLERY_FOLDERS = {
  gallery: "ms-studio-gallery/gallery",
  certificates: "ms-studio-gallery/certificates",
} as const;

export type GalleryKey = keyof typeof GALLERY_FOLDERS;

export const isGalleryFolder = (folder: unknown): folder is string =>
  Object.values(GALLERY_FOLDERS).includes(folder as any);

// Cloudinary's free plan refuses larger files
export const MAX_IMAGE_MB = 10;
export const MAX_VIDEO_MB = 100;

export const MAX_DESCRIPTION_LENGTH = 150;

// Anchor of the note about photo rights on the gallery pages
export const PHOTO_RIGHTS_ID = "photo-rights";

// Small, fast versions of Cloudinary media for previews and the site
export const videoPoster = (url: string, width = 800) =>
  url
    .replace("/video/upload/", `/video/upload/so_0,w_${width},c_limit,q_auto,f_jpg/`)
    .replace(/\.[^./]+$/, ".jpg");

export const videoSource = (url: string) =>
  url.replace("/video/upload/", "/video/upload/w_1280,c_limit,q_auto/").replace(/\.[^./]+$/, ".mp4");
