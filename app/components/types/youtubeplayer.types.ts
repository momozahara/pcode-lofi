export interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (v: number) => void;
}
