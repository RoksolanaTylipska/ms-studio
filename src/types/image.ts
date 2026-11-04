export interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  resource_type?: "image" | "video" | "raw";
  width?: number;
  height?: number;
  created_at?: string;
  description?: string;
}

export interface GalleryPage {
  resources: CloudinaryImage[];
  next_cursor: string | null;
}
