import React, { useEffect, useRef, useState } from "react";
import { useSong } from "../hook/useSong";
import "./player.scss";

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const formatTime = (seconds) => {
  if (Number.isNaN(seconds) || !Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const nextSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${nextSeconds}`;
};

const Player = () => {
  const { song } = useSong();
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [showSpeed, setShowSpeed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const poster = song?.posterUrl || song?.posteUrl;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [song?.url]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  const skip = (seconds) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(Math.max(audio.currentTime + seconds, 0), duration || 0);
  };

  const handleProgressClick = (event) => {
    const bar = progressRef.current;
    const audio = audioRef.current;
    if (!bar || !audio || !duration) return;

    const rect = bar.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    const newTime = ratio * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSpeedChange = (nextSpeed) => {
    setSpeed(nextSpeed);
    audioRef.current.playbackRate = nextSpeed;
    setShowSpeed(false);
  };

  const handleVolume = (event) => {
    const nextVolume = parseFloat(event.target.value);
    setVolume(nextVolume);
    audioRef.current.volume = nextVolume;
    setIsMuted(nextVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  if (!song) return null;

  return (
    <div className="player">
      <audio
        ref={audioRef}
        src={song.url}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
      />

      <div className="player__info">
        {poster ? (
          <img className="player__poster" src={poster} alt={song.title} />
        ) : (
          <div className="player__poster player__poster--empty">{song.title?.charAt(0) || "M"}</div>
        )}
        <div className="player__meta">
          <p className="player__title">{song.title}</p>
          <span className="player__mood">{song.mood || "Moodify"}</span>
        </div>
      </div>

      <div className="player__progress-wrap">
        <span className="player__time">{formatTime(currentTime)}</span>
        <div className="player__progress" ref={progressRef} onClick={handleProgressClick}>
          <div className="player__progress-fill" style={{ width: `${progress}%` }} />
          <div className="player__progress-thumb" style={{ left: `${progress}%` }} />
        </div>
        <span className="player__time">{formatTime(duration)}</span>
      </div>

      <div className="player__controls">
        <div className="player__speed-wrap">
          <button className="player__btn player__btn--speed" onClick={() => setShowSpeed(!showSpeed)}>
            {speed}x
          </button>
          {showSpeed && (
            <div className="player__speed-menu">
              {SPEED_OPTIONS.map((option) => (
                <button
                  key={option}
                  className={`player__speed-option ${option === speed ? "active" : ""}`}
                  onClick={() => handleSpeedChange(option)}
                >
                  {option}x
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="player__btn player__btn--skip" onClick={() => skip(-5)} title="Back 5 seconds">
          -5s
        </button>

        <button className="player__btn player__btn--play" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button className="player__btn player__btn--skip" onClick={() => skip(5)} title="Forward 5 seconds">
          +5s
        </button>

        <div className="player__volume">
          <button className="player__btn player__btn--vol" onClick={toggleMute} title="Mute">
            {isMuted || volume === 0 ? "Muted" : "Volume"}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolume}
            className="player__volume-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
