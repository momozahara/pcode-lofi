import { type MouseEventHandler, type ChangeEventHandler } from "react";

export interface PlayProps {
  isPlaying: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface ShuffleProps {
  onClick: MouseEventHandler;
}

export interface VolumeProps {
  currentVolume: number;
  isMuted: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface VolumeSliderProps {
  currentVolume: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
