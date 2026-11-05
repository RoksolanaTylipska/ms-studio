// Cloudinary folders behind the public galleries; the API only works with these
export const GALLERY_FOLDERS = {
  gallery: "ms-studio-gallery/gallery",
  certificates: "ms-studio-gallery/certificates",
} as const;

export type GalleryKey = keyof typeof GALLERY_FOLDERS;

export const isGalleryFolder = (folder: unknown): folder is string =>
  Object.values(GALLERY_FOLDERS).includes(folder as any);

// Pages that can show their own photos: [id, label in /admin]. Service ids are
// the slugs from SERVICE_PAGES
export const PHOTO_PAGES = [
  ["alexandrite-laser", "Олександритовий лазер"],
  ["diode-laser", "Діодний лазер"],
  ["electroepilation", "Електроепіляція"],
  ["sugaring", "Шугаринг"],
  ["waxing", "Воскова депіляція"],
  ["endosphere", "Ендосфера"],
  ["courses", "Курси"],
] as const;

export type PhotoPage = (typeof PHOTO_PAGES)[number][0];

const PAGE_TAG_PREFIX = "page-";
export const HIDDEN_FROM_GALLERY_TAG = "hidden-from-gallery";
export const pageTag = (page: string) => `${PAGE_TAG_PREFIX}${page}`;

// Where a photo shows up lives in its Cloudinary tags, so photos that were
// never tagged stay in the general gallery
export const placementTags = (pages: string[], hidden: boolean) => [
  ...pages.map(pageTag),
  ...(hidden ? [HIDDEN_FROM_GALLERY_TAG] : []),
];

export const placementFromTags = (tags: string[] = []) => ({
  pages: tags
    .filter((tag) => tag.startsWith(PAGE_TAG_PREFIX))
    .map((tag) => tag.slice(PAGE_TAG_PREFIX.length)),
  hidden: tags.includes(HIDDEN_FROM_GALLERY_TAG),
});

export const isPhotoPageList = (pages: unknown): pages is PhotoPage[] =>
  Array.isArray(pages) && pages.every((page) => PHOTO_PAGES.some(([id]) => id === page));

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
