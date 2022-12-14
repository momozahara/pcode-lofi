"use client";

import React, { ChangeEvent, useState, useEffect, useRef } from "react";
import {
  Play,
  Shuffle,
  Volume,
  VolumeSlider,
  menuPath,
} from "components/button";
import Item from "components/item";
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";

interface Props {
  channelList: {
    name: string;
    key: string;
  }[];
}

export default function Home({ channelList }: Props) {
  let mainRef = useRef<HTMLElement>(null);
  let player = useRef<YouTubePlayer>(null);
  const [appReady, setAppReady] = useState(false);

  const [currentSong, setCurrentSong] = useState(channelList[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(50);
  const [isMenu, setIsMenu] = useState(false);
  const [isPlayButtonReady, setIsPlayButtonReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (!mainRef.current) {
        return;
      }
      mainRef.current.classList.remove("opacity-0");
    }, 1000);
  }, []);

  useEffect(() => {
    const currentSongLocal = localStorage.getItem("currentSong");
    if (!currentSongLocal) {
      localStorage.setItem("currentSong", "0");
    }
    const currentVolumeLocal = localStorage.getItem("currentVolume");
    if (!currentVolumeLocal) {
      localStorage.setItem("currentVolume", "50");
    }
    const isMutedLocal = localStorage.getItem("isMuted");
    if (!isMutedLocal) {
      localStorage.setItem("isMuted", "0");
    }
  }, []);

  useEffect(() => {
    if (player.current === null) {
      return;
    }
    isPlaying ? player.current.playVideo() : player.current.pauseVideo();
  }, [isPlaying]);

  useEffect(() => {
    if (player.current === null) {
      return;
    }
    if (!player.current.setVolume) {
      return;
    }
    isMuted
      ? player.current.setVolume(0)
      : player.current.setVolume(currentVolume);
  }, [isMuted, currentVolume]);

  useEffect(() => {
    const currentVolumeLocal = localStorage.getItem("currentVolume");
    setCurrentVolume(Number(currentVolumeLocal));
    const isMutedLocal = localStorage.getItem("isMuted");
    setIsMuted(Boolean(Number(isMutedLocal)));
  }, [appReady]);

  const onItemClick = (item: { name: string; key: string }) => {
    setIsPlayButtonReady(false);
    setCurrentSong(item);
    localStorage.setItem("currentSong", String(channelList.indexOf(item)));
  };

  const onPlayClick = () => {
    if (!isPlayButtonReady) {
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const onShuffleClick = () => {
    if (!isPlayButtonReady) {
      return;
    }

    setIsPlayButtonReady(false);

    let r = Math.floor(Math.random() * channelList.length);
    while (currentSong === channelList[r]) {
      r = Math.floor(Math.random() * channelList.length);
    }
    setCurrentSong(channelList[r]);
    localStorage.setItem(
      "currentSong",
      String(channelList.indexOf(channelList[r]))
    );
  };

  const onVolumeClick = () => {
    if (currentVolume === 0) {
      return;
    }
    const value = !isMuted;
    localStorage.setItem("isMuted", String(Number(value)));
    setIsMuted(value);
  };

  const onVolumeSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);
    localStorage.setItem("currentVolume", String(value));
    localStorage.setItem("isMuted", "0");
    if (value === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
    setCurrentVolume(value);
  };

  const onPlayerReady = (e: YouTubeEvent) => {
    player.current = e.target;

    const currentSongLocal = localStorage.getItem("currentSong");
    setCurrentSong(channelList[Number(currentSongLocal!)]);

    setAppReady(true);
  };

  const onPlayerStateChange = (e: YouTubeEvent<number>) => {
    document.title = currentSong.name.toUpperCase();
    isMuted
      ? player.current.setVolume(0)
      : player.current.setVolume(currentVolume);
    switch (e.data) {
      case -1: {
        return setIsPlayButtonReady(true);
      }
      case 1: {
        setIsPlayButtonReady(true);
        return setIsPlaying(true);
      }
      case 2: {
        setIsPlayButtonReady(true);
        return setIsPlaying(false);
      }
    }
  };

  const onMenuClick = () => {
    setIsMenu(!isMenu);
  };

  return (
    <main
      ref={mainRef}
      className="fixed top-0 left-0 overflow-hidden fill opacity-0 transition-all"
    >
      <div
        className={`z-50 fixed top-0 left-0 fill bg-black ${
          appReady ? "hidden" : ""
        }`}
      ></div>

      <div
        className={`absolute top-0 left-0 fill z-10 bg-black ${
          isPlaying ? "opacity-[0]" : "opacity-[0.98]"
        } transition-all`}
      />
      <div className="absolute top-0 left-0 fill z-0">
        <YouTube
          videoId={currentSong.key}
          className="youtube-player"
          opts={{
            playerVars: {
              modestbranding: 1,
              disablekb: 1,
              // eslint-disable-next-line camelcase
              iv_load_policy: 3,
              playsinline: 1,
              autoplay: 1,
              controls: 0,
              enablejsapi: 1,
              widgetid: 1,
            },
          }}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
        />
        <div className="absolute top-0 left-0 youtube-shadow fill" />
      </div>

      <div className="z-20 fixed top-0 left-0 lg:hidden">
        <svg
          className="w-[48px] h-[48px] m-[2px] hover:cursor-pointer"
          viewBox="0 0 48 48"
          onClick={onMenuClick}
        >
          <path
            fill="currentColor"
            d={menuPath}
          />
        </svg>
      </div>

      <div
        className={`z-30 fixed top-0 left-0 fill bg-black opacity-[0.9] ${
          isMenu ? "" : "hidden"
        }`}
        onClick={() => setIsMenu(false)}
      />
      <div
        className={`nav ${isMenu ? "block" : ""}`}
        onClick={() => setIsMenu(false)}
      >
        <div className="title">
          <header>
            <a href="#">lofimusic</a>
          </header>
        </div>
        <div className="content">
          <div className="items">
            {channelList.map((item) => {
              return (
                <Item
                  key={item.key}
                  item={item}
                  current={currentSong}
                  onClick={onItemClick}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="controller">
        {/* <Revert /> */}
        <Play
          isPlaying={isPlaying}
          onClick={onPlayClick}
        />
        <Shuffle onClick={onShuffleClick} />
        <Volume
          currentVolume={currentVolume}
          isMuted={isMuted}
          onClick={onVolumeClick}
        />
        <VolumeSlider
          currentVolume={currentVolume}
          onChange={onVolumeSliderChange}
        />
      </div>
    </main>
  );
}
