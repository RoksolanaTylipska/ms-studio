import { CloudinaryImage, GalleryPage } from "@/types/image";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type GallerySearch = { folder: string; maxResults: number; cursor?: string };

export const searchGallery = ({ folder, maxResults, cursor }: GallerySearch) => {
  const query = cloudinary.search
    .expression(`folder:${folder}`)
    .sort_by("created_at", "desc")
    .max_results(maxResults);

  return (cursor ? query.next_cursor(cursor) : query).execute();
};

// Server-side list of a whole gallery for the initial HTML and the sitemap.
// A Cloudinary outage must not block page generation: the browser then loads
// the photos itself, as it did before.
export const fetchGalleryImages = async (folder: string): Promise<GalleryPage> => {
  try {
    const { resources, next_cursor } = await searchGallery({ folder, maxResults: 100 });
    return {
      resources: resources.map(({ public_id, secure_url, resource_type }: CloudinaryImage) => ({
        public_id,
        secure_url,
        resource_type,
      })),
      next_cursor: next_cursor || null,
    };
  } catch (error) {
    console.error("Failed to load gallery images:", error);
    return { resources: [], next_cursor: null };
  }
};
