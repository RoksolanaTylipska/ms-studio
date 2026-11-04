import { isGalleryFolder } from "@/features/gallery/constants";
import { verifyAdmin } from "@/lib/adminAuth";
import { v2 as cloudinary } from "cloudinary";
import type { NextApiRequest, NextApiResponse } from "next";

// Signs a direct browser → Cloudinary upload for an admin, so files (videos
// too) never pass through this server and the API secret stays here
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const email = await verifyAdmin(req);
  if (!email) return res.status(403).json({ error: "No access" });

  const { folder } = req.body ?? {};
  if (!isGalleryFolder(folder)) return res.status(400).json({ error: "Unknown folder" });

  const timestamp = Math.round(Date.now() / 1000);
  const params = { folder, timestamp, context: `uploaded_by=${email}` };
  const signature = cloudinary.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET as string);

  res.status(200).json({
    ...params,
    signature,
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  });
}
