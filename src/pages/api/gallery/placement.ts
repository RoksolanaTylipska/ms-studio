import { GALLERY_FOLDERS, PHOTO_PAGES, isPhotoPageList, placementTags } from "@/features/gallery/constants";
import { verifyAdmin } from "@/lib/adminAuth";
import { galleryFolderOf } from "@/lib/galleryAsset";
import { v2 as cloudinary } from "cloudinary";
import type { NextApiRequest, NextApiResponse } from "next";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALL_TAGS = placementTags(PHOTO_PAGES.map(([id]) => id), true);

// Saves where a photo shows up: its pages and the general gallery (admins only)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const email = await verifyAdmin(req);
  if (!email) return res.status(403).json({ error: "No access" });

  const { publicId, resourceType, pages, hidden } = req.body ?? {};
  const folder = await galleryFolderOf(publicId, resourceType);
  if (
    folder !== GALLERY_FOLDERS.gallery ||
    !isPhotoPageList(pages) ||
    typeof hidden !== "boolean"
  ) {
    return res.status(400).json({ error: "Bad request" });
  }

  try {
    const wanted = placementTags(pages, hidden);
    const options = { resource_type: resourceType };
    const unwanted = ALL_TAGS.filter((tag) => !wanted.includes(tag));
    if (unwanted.length > 0) await cloudinary.uploader.remove_tag(unwanted.join(","), [publicId], options);
    if (wanted.length > 0) await cloudinary.uploader.add_tag(wanted.join(","), [publicId], options);
    res.status(200).json({ ok: true });
  } catch (error: any) {
    console.error("Failed to save photo placement:", error?.message);
    res.status(500).json({ error: "Failed to save" });
  }
}
