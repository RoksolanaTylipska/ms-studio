import { v2 as cloudinary } from "cloudinary";

// Photos added through the Cloudinary console have a public id without the
// folder, so the folder has to come from the asset itself
export const galleryFolderOf = async (publicId: unknown, resourceType: unknown) => {
  if (typeof publicId !== "string" || !["image", "video"].includes(resourceType as string)) return null;
  try {
    const asset = await cloudinary.api.resource(publicId, { resource_type: resourceType as string });
    return (asset.asset_folder ?? asset.folder) as string;
  } catch {
    return null;
  }
};
