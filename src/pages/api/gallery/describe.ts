import { MAX_DESCRIPTION_LENGTH, isGalleryFolder } from "@/features/gallery/constants";
import { verifyAdmin } from "@/lib/adminAuth";
import { v2 as cloudinary } from "cloudinary";
import type { NextApiRequest, NextApiResponse } from "next";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Saves a photo's description for search engines (admins only). It lives on the
// Cloudinary asset as the `alt` context value, so it is deleted with the photo.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const email = await verifyAdmin(req);
  if (!email) return res.status(403).json({ error: "No access" });

  const { publicId, resourceType, description } = req.body ?? {};
  const folder = typeof publicId === "string" ? publicId.slice(0, publicId.lastIndexOf("/")) : null;
  if (
    !isGalleryFolder(folder) ||
    !["image", "video"].includes(resourceType) ||
    typeof description !== "string" ||
    description.length > MAX_DESCRIPTION_LENGTH
  ) {
    return res.status(400).json({ error: "Bad request" });
  }

  try {
    // Escapes "=" and "|", which separate context values
    const context = `alt=${description.trim().replace(/[=|]/g, "\\$&")}`;
    await cloudinary.uploader.add_context(context, [publicId], { resource_type: resourceType });
    res.status(200).json({ ok: true });
  } catch (error: any) {
    console.error("Failed to save gallery description:", error?.message);
    res.status(500).json({ error: "Failed to save" });
  }
}
