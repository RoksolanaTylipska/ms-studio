import {
  PauseCircle,
  PlayCircle,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { VideoContainer } from "./styled";

declare global {
  interface Window {
    fbq?: Function;
    dataLayer: any;
  }
}

export const VideoBlock = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoIsInView, setVideoIsInView] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const currentVideo = videoRef.current;

    if (currentVideo) {
      if (currentVideo.paused) {
        currentVideo.play();
        setIsPlaying(true);
      } else {
        currentVideo.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    const currentVideo = videoRef.current;
    if (currentVideo) {
      currentVideo.muted = !currentVideo.muted;
      setIsMuted(currentVideo.muted);
    }
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

    if (currentVideo) {
      currentVideo.addEventListener("ended", handleVideoEnded);

      return () => {
        currentVideo.removeEventListener("ended", handleVideoEnded);
      };
    }
  }, [videoRef]);

  let videoSource = "/video/mobile.mp4";

  // useEffect(() => {
  //   videoSource = isMobile ? "/video/mobile.mp4" : "/video/desktop.mp4";
  // }, [isMobile]);

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

    if (currentVideo) {
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
    }
  }, [videoIsInView]);

  return (
    <VideoContainer>
      <video
        autoPlay
        muted={isMuted}
        playsInline
        style={{ width: "100%", borderRadius: "15px" }}
        ref={videoRef}
      >
        <source src={videoSource} type="video/mp4" />
      </video>

      <button onClick={toggleMute}>
        {isMuted ? <VolumeOff /> : <VolumeUp />}
      </button>

      <button onClick={togglePlay} className="md:flex hidden">
        {!isPlaying ? <PlayCircle /> : <PauseCircle />}
      </button>
    </VideoContainer>
  );
};
