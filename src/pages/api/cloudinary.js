import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  const { next_cursor, folder } = req.query;
  // Використовуємо folder з параметра або значення за замовчуванням
  const folderName = folder ? folder : "ms-studio-gallery/gallery";

  try {
    let query = cloudinary.search
    .expression(`folder:${folderName}`)
    .sort_by("created_at", "desc")
      .max_results(8);

    if (next_cursor) {
      query = query.next_cursor(next_cursor);
    }

    const result = await query.execute();
    res.status(200).json({
      resources: result.resources,
      next_cursor: result.next_cursor || null,
    });
  } catch (error) {
    console.error("Error fetching images:", error.message);
    res.status(500).json({ error: "Failed to fetch images" });
  }
}
