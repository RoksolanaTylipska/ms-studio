import { isGalleryFolder } from "@/features/gallery/constants";
import { verifyAdmin } from "@/lib/adminAuth";
import { galleryFolderOf } from "@/lib/galleryAsset";
import { v2 as cloudinary } from "cloudinary";
import type { NextApiRequest, NextApiResponse } from "next";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Removes a photo or video from one of the galleries (admins only)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const email = await verifyAdmin(req);
  if (!email) return res.status(403).json({ error: "No access" });

  const { publicId, resourceType } = req.body ?? {};
  const folder = await galleryFolderOf(publicId, resourceType);
  if (!isGalleryFolder(folder)) {
    return res.status(400).json({ error: "Bad request" });
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType, invalidate: true });
    if (result.result !== "ok" && result.result !== "not found") throw new Error(result.result);
    res.status(200).json({ ok: true });
  } catch (error: any) {
    console.error("Failed to delete gallery item:", error?.message);
    res.status(500).json({ error: "Failed to delete" });
  }
}
