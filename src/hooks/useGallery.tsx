import { CloudinaryImage } from "@/types/image";
import { useState, useEffect, useRef, useCallback } from "react";

export const useGallery = (folder = 'ms-studio-gallery/gallery') => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>("");
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(images)
  const sentinelRef = useRef(null);
  const hasFetchedInitialRef = useRef(false);


  const fetchImages = useCallback(async (cursor = null) => {
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

  const toggleOpenModal = (image?: string) => {
    setSelectedImage(image || "");
    setModalOpen(!isModalOpen);
  };

  return { images, loading, sentinelRef, toggleOpenModal, isModalOpen, selectedImage };
};
