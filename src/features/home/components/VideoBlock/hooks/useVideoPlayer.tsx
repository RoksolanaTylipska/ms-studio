
import { useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export const useVideoPlayer = (mobileSrc: string, desktopSrc: string) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoIsInView, setVideoIsInView] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const togglePlay = () => {
    const currentVideo = videoRef.current;
    if (!currentVideo) return;

    if (currentVideo.paused) {
      currentVideo.play();
      setIsPlaying(true);
    } else {
      currentVideo.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const currentVideo = videoRef.current;
    if (!currentVideo) return;

    currentVideo.muted = !currentVideo.muted;
    setIsMuted(currentVideo.muted);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    const currentVideo = videoRef.current;
    if (currentVideo) {
      currentVideo.pause();
      currentVideo.currentTime = 0;
    }
  };

  useEffect(() => {
    const currentVideo = videoRef.current;
    if (!currentVideo) return;

    currentVideo.addEventListener("ended", handleVideoEnded);

    return () => {
      currentVideo.removeEventListener("ended", handleVideoEnded);
    };
  }, [videoRef]);

  useEffect(() => {
    const currentVideo = videoRef.current;
    if (!currentVideo) return;

    currentVideo.src = isMobile ? mobileSrc : desktopSrc;
    currentVideo.load();
    currentVideo.play();
  }, [isMobile, mobileSrc, desktopSrc]);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setVideoIsInView(true);
      } else {
        setVideoIsInView(false);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    });

    const currentVideo = videoRef.current;

    if (currentVideo) {
      observer.observe(currentVideo);
    }

    return () => {
      if (currentVideo) {
        observer.unobserve(currentVideo);
      }
    };
  }, [videoRef]);

  useEffect(() => {
    const currentVideo = videoRef.current;
    if (!currentVideo) return;

    if (videoIsInView) {
      currentVideo.play();
      setIsPlaying(true);

      if (typeof window !== "undefined") {
        window.dataLayer.push({
          event: "video",
        });
      }
    } else {
      currentVideo.pause();
      setIsPlaying(false);
    }
  }, [videoIsInView]);

  return {
    videoRef,
    isMuted,
    isPlaying,
    togglePlay,
    toggleMute,
  };
};
