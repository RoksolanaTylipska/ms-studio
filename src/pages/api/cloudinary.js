import { v2 as cloudinary } from "cloudinary";
import { GALLERY_FOLDERS, isGalleryFolder } from "@/features/gallery/constants";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  const { next_cursor, folder, fresh } = req.query;
  // Використовуємо folder з параметра або значення за замовчуванням
  const folderName = folder ? folder : GALLERY_FOLDERS.gallery;
  // Only the site's own galleries can be listed
  if (!isGalleryFolder(folderName)) {
    return res.status(400).json({ error: "Unknown folder" });
  }

  try {
    let query = cloudinary.search
    .expression(`folder:${folderName}`)
    .sort_by("created_at", "desc")
      .max_results(fresh ? 30 : 8);

    if (next_cursor) {
      query = query.next_cursor(next_cursor);
    }

    const result = await query.execute();
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
