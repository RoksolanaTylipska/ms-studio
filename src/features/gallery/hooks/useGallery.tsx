import { CloudinaryImage, GalleryPage } from "@/types/image";
import { useState, useEffect, useRef, useCallback } from "react";

export const useGallery = (folder = 'ms-studio-gallery/gallery', initial?: GalleryPage) => {
  // Index of the photo open in the modal
  const [opened, setOpened] = useState<number | null>(null);
  const [images, setImages] = useState<CloudinaryImage[]>(initial?.resources ?? []);
  const [nextCursor, setNextCursor] = useState(initial?.next_cursor ?? null);
  const [loading, setLoading] = useState(false);

  const sentinelRef = useRef(null);
  // Photos rendered on the server need no first request from the browser
  const hasFetchedInitialRef = useRef(Boolean(initial?.resources.length));


  const fetchImages = useCallback(async (cursor: string | null = null) => {
    setLoading(true);
    try {
      const folderQuery = `folder=${encodeURIComponent(`${folder}`)}`;
      const cursorQuery = cursor ? `&next_cursor=${cursor}` : "";
      const url = `/api/cloudinary?${folderQuery}${cursorQuery}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.resources && Array.isArray(data.resources)) {
        setImages((prev) => {
          const newImages = data.resources.filter(
            (img: CloudinaryImage) =>
              !prev.some((prevImg) => prevImg.public_id === img.public_id)
          );
          return [...prev, ...newImages];
        });
      } else {
        console.error("Невідома структура даних", data);
      }
      setNextCursor(data.next_cursor);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!hasFetchedInitialRef.current) {
      fetchImages();
      hasFetchedInitialRef.current = true;
    }
  }, [fetchImages]);

  useEffect(() => {
    if (loading) return;
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && nextCursor) {
        fetchImages(nextCursor);
      }
    });

    observer.observe(sentinelRef.current);

    return () => {
      if (sentinelRef.current) observer.unobserve(sentinelRef.current);
    };
  }, [loading, nextCursor, fetchImages]);

  // Paging through the modal near the end loads the next photos too
  useEffect(() => {
    if (opened !== null && opened >= images.length - 2 && nextCursor && !loading) fetchImages(nextCursor);
  }, [opened, images.length, nextCursor, loading, fetchImages]);

  return { images, loading, sentinelRef, opened, setOpened };
};
