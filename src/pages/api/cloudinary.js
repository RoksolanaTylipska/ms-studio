import { GALLERY_FOLDERS, isGalleryFolder } from "@/features/gallery/constants";
import { searchGallery } from "@/lib/galleryImages";

export default async function handler(req, res) {
  const { next_cursor, folder, fresh } = req.query;
  // Використовуємо folder з параметра або значення за замовчуванням
  const folderName = folder ? folder : GALLERY_FOLDERS.gallery;
  // Only the site's own galleries can be listed
  if (!isGalleryFolder(folderName)) {
    return res.status(400).json({ error: "Unknown folder" });
  }

  try {
    const result = await searchGallery({
      folder: folderName,
      maxResults: fresh ? 30 : 8,
      cursor: next_cursor,
    });
    // Cache on the CDN so Cloudinary's rate-limited Search API isn't hit on
    // every visit, but briefly, so new uploads from /admin show up within
    // minutes; the admin panel itself asks for a fresh list
    res.setHeader(
      "Cache-Control",
      fresh ? "no-store" : "public, s-maxage=300, stale-while-revalidate=86400"
    );
    res.status(200).json({
      resources: result.resources,
      next_cursor: result.next_cursor || null,
    });
  } catch (error) {
    console.error("Error fetching images:", error.message);
    res.status(500).json({ error: "Failed to fetch images" });
  }
}
