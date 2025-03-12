import React from 'react';
import PropTypes from 'prop-types';
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import ReplayIcon from "@mui/icons-material/Replay";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function MediaControls({ 
  isPlay, 
  onPlayPause, 
  onPrev, 
  onNext, 
  onShuffle, 
  onRestart,
  currentTime,
  duration,
  onSeek,
  isMobile,
  disabled = false
}) {
  
  // Format time display (mm:ss)
  const formatTime = (time) => {
    if (isNaN(time) || time === Infinity) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-4 text-neutral-500">
        <button className="hidden sm:block" onClick={onShuffle} disabled={disabled}>
          <ShuffleIcon 
            className={`transition ${!disabled ? "hover:text-white" : "opacity-50"}`}
            fontSize="small"
          />
        </button>
        <button onClick={onPrev} disabled={disabled}>
          <SkipPreviousIcon 
            className={`transition ${!disabled ? "hover:text-white" : "opacity-50"}`}
            fontSize="small"
          />
        </button>

        <button
          onClick={onPlayPause}
          className="p-1 text-black transition bg-white rounded-full hover:scale-110"
          disabled={disabled}
        >
          {isPlay ? <PauseRounded fontSize="small" /> : <PlayArrowRounded fontSize="small" />}
        </button>
        
        <button onClick={onNext} disabled={disabled}>
          <SkipNextIcon 
            className={`transition ${!disabled ? "hover:text-white" : "opacity-50"}`}
            fontSize="small"
          />
        </button>
        
        <button 
          className="hidden sm:block"
          onClick={onRestart}
          disabled={disabled}
        >
          <ReplayIcon 
            className={`transition ${!disabled ? "hover:text-white" : "opacity-50"}`}
            fontSize="small"
          />
        </button>
      </div>
      
      <div className="flex items-center mt-1 gap-1 sm:gap-2 md:gap-3 font-sans text-[8px] sm:text-[10px] md:text-[12px] text-neutral-400">
        <div>{formatTime(currentTime)}</div>
        <Box className="w-full mx-1" sx={{ width: '100%' }}>
          <Slider
            min={0}
            max={duration || 100}
            size="small"
            aria-label="time-slider"
            step={0.01}
            onChange={onSeek}
            value={currentTime || 0}
            disabled={!duration || disabled}
            color="success"
            sx={{ color: "#1DB954" }}
          />
        </Box>
        <div>{formatTime(duration)}</div>
      </div>
    </div>
  );
}

MediaControls.propTypes = {
  isPlay: PropTypes.bool.isRequired,
  onPlayPause: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onShuffle: PropTypes.func.isRequired,
  onRestart: PropTypes.func.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onSeek: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  disabled: PropTypes.bool
};

export default MediaControls;
