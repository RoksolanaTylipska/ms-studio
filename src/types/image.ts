export interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  resource_type?: "image" | "video" | "raw";
  width?: number;
  height?: number;
  created_at?: string;
}
