import { useEffect, useRef, useState } from "react";

export const useVideoPlayer = (mobileSrc: string, desktopSrc: string) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoIsInView, setVideoIsInView] = useState(false);

  const togglePlay = () => {
    const currentVideo = videoRef.current;
    if (!currentVideo) return;

    if (currentVideo.paused) {
      currentVideo.play().catch(() => setIsPlaying(false));
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
      // Load the video only once it scrolls into view, picking the right size for the screen
      if (!currentVideo.getAttribute("src")) {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        currentVideo.src = isMobile ? mobileSrc : desktopSrc;
      }

      currentVideo
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));

      window.dataLayer?.push({
        event: "video",
      });
    } else {
      currentVideo.pause();
      setIsPlaying(false);
    }
  }, [videoIsInView, mobileSrc, desktopSrc]);

  return {
    videoRef,
    isMuted,
    isPlaying,
    togglePlay,
    toggleMute,
  };
};
