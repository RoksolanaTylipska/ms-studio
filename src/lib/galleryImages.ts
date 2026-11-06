import { GALLERY_FOLDERS, HIDDEN_FROM_GALLERY_TAG, pageTag, placementFromTags } from "@/features/gallery/constants";
import { CloudinaryImage, GalleryPage } from "@/types/image";
import { v2 as cloudinary } from "cloudinary";

const MAX_PAGE_PHOTOS = 12;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type GallerySearch = {
  folder: string;
  maxResults: number;
  cursor?: string;
  // Only /admin sees the photos left out of the general gallery
  includeHidden?: boolean;
};

const runSearch = (expression: string, maxResults: number, cursor?: string) => {
  const query = cloudinary.search
    .expression(expression)
    .sort_by("created_at", "desc")
    .with_field("context")
    .with_field("tags")
    .max_results(maxResults);

  return (cursor ? query.next_cursor(cursor) : query).execute();
};

export const searchGallery = ({ folder, maxResults, cursor, includeHidden }: GallerySearch) =>
  runSearch(
    includeHidden ? `folder:${folder}` : `folder:${folder} AND -tags=${HIDDEN_FROM_GALLERY_TAG}`,
    maxResults,
    cursor
  );

// Only these fields leave the server: Cloudinary's context also holds the
// uploader's email, which must stay private
export const toGalleryImage = ({
  public_id,
  secure_url,
  resource_type,
  context,
  tags,
}: CloudinaryImage & { context?: { alt?: string }; tags?: string[] }): CloudinaryImage => ({
  public_id,
  secure_url,
  resource_type,
  ...(context?.alt ? { description: context.alt } : {}),
  ...placementFromTags(tags),
});

// Server-side list of a whole gallery for the initial HTML and the sitemap.
// A Cloudinary outage must not block page generation: the browser then loads
// the photos itself, as it did before.
export const fetchGalleryImages = async (folder: string): Promise<GalleryPage> => {
  try {
    const { resources, next_cursor } = await searchGallery({ folder, maxResults: 100 });
    return {
      resources: resources.map(toGalleryImage),
      next_cursor: next_cursor || null,
    };
  } catch (error) {
    console.error("Failed to load gallery images:", error);
    return { resources: [], next_cursor: null };
  }
};

// Latest photos of one page for its small gallery; the page works without them
export const fetchPagePhotos = async (page: string): Promise<CloudinaryImage[]> => {
  try {
    const { resources } = await runSearch(
      `folder:${GALLERY_FOLDERS.gallery} AND tags=${pageTag(page)}`,
      MAX_PAGE_PHOTOS
    );
    return resources.map(toGalleryImage);
  } catch (error) {
    console.error(`Failed to load photos of ${page}:`, error);
    return [];
  }
};
