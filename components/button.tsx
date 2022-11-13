import React, { ChangeEventHandler, MouseEventHandler } from "react";

export const leftArrowPath =
  "M28.1 36.45 15.55 23.9 28.1 11.35l2.6 2.6-9.95 9.95 9.95 9.95Z";

export const playPath = "M15.3 38.8V8.9l23.55 14.95Z";
export const pausePath = "M26.25 38.7V9.2h12.5v29.5Zm-17 0V9.2h12.5v29.5Z";

export const shufflePath =
  "M29.05 39.95V37.5h6.65l-9.05-9 1.7-1.7 9.05 9.05v-6.7h2.45v10.8Zm-19.2-.2-1.7-1.7 27.55-27.6h-6.65V8h10.8v10.8H37.4v-6.6Zm9.6-18.65L8.15 9.9l1.7-1.7 11.3 11.2Z";

export const volumeUpPath =
  "M27.6 43.3v-3.75q5.4-1.4 8.8-5.75 3.4-4.35 3.4-9.9 0-5.5-3.4-9.825Q33 9.75 27.6 8.35V4.6Q34.55 6 39 11.425q4.45 5.425 4.45 12.475 0 7.15-4.425 12.6Q34.6 41.95 27.6 43.3ZM4.55 30.5v-13h8.35L23.6 6.75v34.5L12.9 30.5Zm22.05 2.2V15.3q2.85.9 4.575 3.3T32.9 24q0 3-1.725 5.4-1.725 2.4-4.575 3.3Z";
export const volumeDownPath =
  "M9.35 30.5v-13h8.35L28.4 6.75v34.5L17.7 30.5Zm22.05 2.2V15.3q2.85.9 4.575 3.3T37.7 24q0 3-1.725 5.375T31.4 32.7Z";
export const volumeMutePath = "M13.45 30.5v-13h8.35L32.5 6.75v34.5L21.8 30.5Z";
export const volumeOffPath =
  "M41.05 46.15 34.85 40q-1.7 1.15-3.625 2-1.925.85-4.075 1.3v-3.75q1.35-.35 2.625-.85t2.425-1.35l-9.05-9.1v13L12.45 30.5H4.1v-13h8.25l-11-11.05 2.6-2.6 39.7 39.65Zm-.7-12.35-2.7-2.7q.9-1.65 1.3-3.45.4-1.8.4-3.75 0-5.6-3.375-10.025Q32.6 9.45 27.15 8.35V4.6q6.95 1.4 11.4 6.825Q43 16.85 43 23.9q0 2.65-.675 5.15-.675 2.5-1.975 4.75Zm-8.15-8.15-5.05-5.05v-4.95q2.45 1.15 3.875 3.4Q32.45 21.3 32.45 24q0 .45-.05.85-.05.4-.2.8Zm-9.05-9.05-4.9-4.95 4.9-4.9Z";

export const menuPath =
  "M5.55 36.55V32.9H42.5v3.65Zm0-10.75v-3.65H42.5v3.65Zm0-10.7v-3.65H42.5v3.65Z";

export function Revert() {
  return (
    <button className="control hidden sm:block">
      <div className="icon">
        <svg
          className="icon"
          viewBox="0 0 48 48"
        >
          <path
            fill="currentColor"
            d={leftArrowPath}
          />
        </svg>
      </div>
    </button>
  );
}

interface PlayProps {
  isPlaying: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function Play({ isPlaying, onClick }: PlayProps) {
  return (
    <button
      className="control"
      onClick={onClick}
    >
      <div className="icon">
        <svg
          className="icon"
          viewBox="0 0 48 48"
        >
          <path
            fill="currentColor"
            d={isPlaying ? pausePath : playPath}
          />
        </svg>
      </div>
    </button>
  );
}

interface ShuffleProps {
  onClick: MouseEventHandler;
}

export function Shuffle({ onClick }: ShuffleProps) {
  return (
    <button
      className="control main"
      onClick={onClick}
    >
      <div className="icon main">
        <svg
          className="icon main"
          viewBox="0 0 48 48"
        >
          <path
            fill="currentColor"
            d={shufflePath}
          />
        </svg>
      </div>
    </button>
  );
}

interface VolumeProps {
  currentVolume: number;
  isMuted: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function Volume({ currentVolume, isMuted, onClick }: VolumeProps) {
  return (
    <button
      className="control"
      onClick={onClick}
    >
      <div className="icon">
        <svg
          className="icon"
          viewBox="0 0 48 48"
        >
          <path
            fill="currentColor"
            d={
              isMuted
                ? volumeOffPath
                : currentVolume > 60
                ? volumeUpPath
                : currentVolume > 20
                ? volumeDownPath
                : currentVolume !== 0
                ? volumeMutePath
                : volumeOffPath
            }
          />
        </svg>
      </div>
    </button>
  );
}

interface VolumeSliderProps {
  currentVolume: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}
export function VolumeSlider({ currentVolume, onChange }: VolumeSliderProps) {
  return (
    <div className="hidden sm:block">
      <input
        type="range"
        name="volume"
        id="volume"
        onChange={onChange}
        value={currentVolume}
        min={0}
        max={100}
      />
    </div>
  );
}
