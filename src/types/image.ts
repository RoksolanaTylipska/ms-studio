export interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  resource_type?: "image" | "video" | "raw";
  width?: number;
  height?: number;
  created_at?: string;
  description?: string;
  // Pages this photo also appears on (PHOTO_PAGES ids)
  pages?: string[];
  // Left out of the general gallery
  hidden?: boolean;
}

export interface GalleryPage {
  resources: CloudinaryImage[];
  next_cursor: string | null;
}
