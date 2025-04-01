import {
  PauseCircle,
  PlayCircle,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";
import { useVideoPlayer } from "./hooks/useVideoPlayer";
import { VideoContainer } from "./styled";

declare global {
  interface Window {
    fbq?: Function;
    dataLayer: any;
  }
}

export const VideoBlock = () => {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const mobile = `https://res.cloudinary.com/${cloud}/video/upload/mobile-vodeo_ockbps.mp4`;
  const desktop = `https://res.cloudinary.com/${cloud}/video/upload/desktop-video_ixkedc.mp4`;

  const { videoRef, isMuted, isPlaying, togglePlay, toggleMute } =
    useVideoPlayer(mobile, desktop);

  return (
    <VideoContainer>
      <video
        // key={videoSource}
        autoPlay
        muted={isMuted}
        playsInline
        style={{ width: "100%", borderRadius: "15px" }}
        ref={videoRef}
      >
        <source src={desktop} type="video/mp4" />
      </video>

      <button onClick={toggleMute}>
        {isMuted ? <VolumeOff sx={{color: "black"}} /> : <VolumeUp sx={{color: "black"}} />}
      </button>

      <button onClick={togglePlay} className="md:flex hidden">
        {!isPlaying ? <PlayCircle sx={{color: "black"}} /> : <PauseCircle sx={{color: "black"}} />}
      </button>
    </VideoContainer>
  );
};
