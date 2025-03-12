import Box from "@mui/material/Box";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SpeakerIcon from "@mui/icons-material/Speaker";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useEffect, useRef, useState } from "react";
import { VolumeDown } from "@mui/icons-material";
import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
import { useContext } from "react";
import SearchContext from "../Siderbar/SearchContext";
import { Link } from "react-router-dom";
import config from "../../../config";
import MediaControls from "../../../components/MediaControls";
import MusicVisualizer from "../../../components/MusicVisualizer";
import FullscreenVisualizer from "../../../components/FullscreenVisualizer";

function Playingbar() {
  const audioRef = useRef(null);
  const [isPlay, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentSong, setCurrentSong] = useState();
  const { selectSong, setSelectSong } = useContext(SearchContext);
  const { listSongs, isMobile } = useContext(SearchContext);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [visualizerType, setVisualizerType] = useState('bars');
  const [showFullscreen, setShowFullscreen] = useState(false);

  // Initialize audio element on component mount
  useEffect(() => {
    // Create a new Audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
      
      // Mark audio as loaded when it's ready
      audioRef.current.oncanplaythrough = () => {
        setAudioLoaded(true);
      };
      
      // Handle audio loading errors
      audioRef.current.onerror = (e) => {
        console.error("Audio loading error:", e);
        setPlay(false);
      };
    }
    
    return () => {
      // Cleanup: pause and remove the audio element on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);
    
  // Handle song changes
  useEffect(() => {
    // Skip if selectSong is empty or audioRef is not initialized
    if (!selectSong?.audio || !audioRef.current) return;
    
    if (selectSong.audio !== currentSong?.audio) {
      setCurrentSong(selectSong);
      
      try {
        audioRef.current.src = selectSong.audio;
        audioRef.current.load();
        
        // Only auto-play if we're switching songs (not on first load)
        if (currentSong) {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setPlay(true);
              })
              .catch(error => {
                console.error("Auto-play prevented:", error);
                setPlay(false);
              });
          }
        }
      } catch (error) {
        console.error("Error setting audio source:", error);
        setPlay(false);
      }
    }
  }, [selectSong, currentSong?.audio]);

  const handlePlay = () => {
    if (!audioRef.current || !selectSong?.audio) return;
    
    if (isPlay) {
      audioRef.current.pause();
      setPlay(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPlay(true);
          })
          .catch(error => {
            console.error("Play error:", error);
            setPlay(false);
          });
      }
    }
  };

  // Set up event listeners for the audio element
  useEffect(() => {
    if (!audioRef.current) return;
    
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
        
        // Check if we've reached the end of the song
        if (audioRef.current.currentTime >= audioRef.current.duration - 0.1) {
          setPlay(false);
          
          // Auto-play next song option
          // if (listSongs && listSongs.length > 0) {
          //   const currentIndex = listSongs.findIndex(song => song.id === selectSong.id);
          //   if (currentIndex < listSongs.length - 1) {
          //     handleNextSong(selectSong.id);
          //   }
          // }
        }
      }
    };

    const handleDurationChange = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration || 0);
      }
    };

    const handleVolumeChange = () => {
      if (audioRef.current) {
        setVolume(audioRef.current.volume);
      }
    };
    
    const handleKeySpace = (event) => {
      if (event.code === "Space" && document.activeElement.tagName !== "INPUT") {
        event.preventDefault();
        handlePlay();
      }
    };
    
    // Add event listeners
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("loadedmetadata", handleDurationChange);
    audioRef.current.addEventListener("volumechange", handleVolumeChange);
    document.addEventListener("keydown", handleKeySpace);
    
    // Clean up event listeners
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("loadedmetadata", handleDurationChange);
        audioRef.current.removeEventListener("volumechange", handleVolumeChange);
      }
      document.removeEventListener("keydown", handleKeySpace);
    };
  }, [selectSong?.id, listSongs]);

  const handleVolumeChange = (e, newValue) => {
    if (!audioRef.current) return;
    audioRef.current.volume = newValue;
    setVolume(newValue);
  };

  const handleSeek = (e, newValue) => {
    if (!audioRef.current || isNaN(newValue)) return;
    
    // Ensure newValue is within valid range
    const seekTime = Math.max(0, Math.min(newValue, audioRef.current.duration || 0));
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };
  
  // Previous Song
  const handlePrevSong = (id) => {
    if (!listSongs || !listSongs.length) return;
    
    const currentIndex = listSongs.findIndex(song => song.id === id);
    if (currentIndex > 0) {
      setSelectSong(listSongs[currentIndex - 1]);
    }
  };

  // Next Song
  const handleNextSong = (id) => {
    if (!listSongs || !listSongs.length) return;
    
    const currentIndex = listSongs.findIndex(song => song.id === id);
    if (currentIndex < listSongs.length - 1) {
      setSelectSong(listSongs[currentIndex + 1]);
    }
  };

  // Random song
  const handleRandomSong = () => {
    if (!listSongs || listSongs.length <= 1) return;
    
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * listSongs.length);
    } while (listSongs[randomIndex].id === selectSong?.id);
    
    setSelectSong(listSongs[randomIndex]);
  };

  // Restart song
  const handleRestartSong = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (!isPlay) {
        handlePlay();
      }
    }
  };

  // Toggle visualizer display
  const toggleVisualizer = () => {
    setShowVisualizer(prev => !prev);
  };
  
  // Toggle fullscreen visualizer
  const toggleFullscreenVisualizer = () => {
    setShowFullscreen(prev => !prev);
  };
  
  // Cycle through visualizer types
  const cycleVisualizerType = () => {
    const types = ['bars', 'waves', 'circle'];
    const currentIndex = types.indexOf(visualizerType);
    const nextIndex = (currentIndex + 1) % types.length;
    setVisualizerType(types[nextIndex]);
  };

  // Format time display
  const formatTime = (time) => {
    if (isNaN(time) || time === Infinity) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  // Check if selectSong is defined before rendering
  if (!selectSong || !Object.keys(selectSong).length) {
    return <div className="h-[60px] sm:h-[70px] md:h-[80px] bg-[#181818] text-center text-gray-400 py-4">No song selected</div>;
  }

  return (
    <>
      {/* Fullscreen Visualizer */}
      {showFullscreen && (
        <FullscreenVisualizer 
          audioElement={audioRef.current}
          isPlaying={isPlay}
          onClose={() => setShowFullscreen(false)}
        />
      )}
      
      {/* Visualizer Panel */}
      {showVisualizer && !showFullscreen && (
        <div className="relative mb-2 overflow-hidden bg-black rounded-md h-[120px]">
          <MusicVisualizer 
            audioElement={audioRef.current} 
            isPlaying={isPlay} 
            type={visualizerType}
          />
          <div className="absolute space-x-2 top-2 right-2">
            <button 
              onClick={cycleVisualizerType}
              className="px-2 py-1 text-xs text-white transition-opacity bg-black bg-opacity-50 rounded-md hover:bg-opacity-70"
            >
              Change Style
            </button>
            <button 
              onClick={toggleFullscreenVisualizer}
              className="px-2 py-1 text-xs text-white transition-opacity bg-black bg-opacity-50 rounded-md hover:bg-opacity-70"
            >
              Fullscreen
            </button>
            <button 
              onClick={toggleVisualizer}
              className="px-2 py-1 text-xs text-white transition-opacity bg-black bg-opacity-50 rounded-md hover:bg-opacity-70"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      <div className={`py-1 sm:py-2 text-white ${isMobile ? "flex flex-col space-y-1" : "flex flex-col sm:flex-row justify-between items-center"}`}>
        {/* Audio element is created and managed via React ref instead of in JSX */}
        
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            onClick={() => {
              const scrolledPosition = document.querySelector(".scrollChange");
              if (scrolledPosition) scrolledPosition.scrollTo(0, 0);
            }}
            className="flex gap-1 sm:gap-2 max-w-[150px] sm:max-w-[200px] md:max-w-[300px] shrink-0 overflow-hidden whitespace-nowrap overflow-ellipsis"
            to={`${config.routes.PlayingMusic}/${selectSong.name}`}
          >
            <div>
              <img
                className="object-cover bg-black rounded-lg h-[32px] w-[32px] sm:h-[40px] sm:w-[40px] md:h-[56px] md:w-[56px]"
                src={selectSong.img}
                alt={selectSong.name}
                onError={(e) => {e.target.src = "https://via.placeholder.com/56"}}
              />
            </div>
            <div>
              <div className="text-xs font-semibold truncate sm:text-sm md:text-base">{selectSong.name}</div>
              <div className="text-[#B3B3B3] font-semibold text-[10px] sm:text-xs md:text-sm truncate">
                {selectSong.sing}
              </div>
            </div>
          </Link>
          {!isMobile && (
            <div className="flex gap-2">
              <button className="hidden transition hover:text-green-500 sm:block">
                <FavoriteBorderIcon fontSize={isMobile ? "small" : "medium"} />
              </button>
              <button 
                className="transition hover:text-green-500"
                onClick={toggleVisualizer}
                title="Visualizer"
              >
                <BarChartIcon fontSize="small" className={showVisualizer ? "text-green-500" : ""} />
              </button>
            </div>
          )}
        </div>
        
        <div className={`${isMobile ? "w-full" : "max-w-[300px] sm:max-w-[400px] md:max-w-[500px] w-full"}`}>
          <MediaControls 
            isPlay={isPlay}
            onPlayPause={handlePlay}
            onPrev={() => handlePrevSong(selectSong.id)}
            onNext={() => handleNextSong(selectSong.id)}
            onShuffle={handleRandomSong}
            onRestart={handleRestartSong}
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeek}
            isMobile={isMobile}
            disabled={!audioLoaded && !currentSong}
          />
        </div>
        
        {!isMobile && (
          <div className="items-center justify-center hidden gap-2 pr-2 sm:flex md:pr-10">
            <Tooltip title="Danh sách nhạc" placement="top">
              <button>
                <PlaylistPlayIcon fontSize="small" />
              </button>
            </Tooltip>
            <Tooltip title="Micro" placement="top">
              <button className="hidden md:block">
                <KeyboardVoiceIcon fontSize="small" />
              </button>
            </Tooltip>
            <Tooltip title="Tune" placement="top">
              <button className="hidden md:block">
                <TuneIcon fontSize="small" />
              </button>
            </Tooltip>

            <Tooltip title="Loa" placement="top">
              <button>
                <SpeakerIcon fontSize="small" />
              </button>
            </Tooltip>
            <VolumeDown fontSize="small" />

            <Slider
              sx={{ width: 60, color: "#1DB954" }}
              min={0}
              max={1}
              step={0.01}
              size="small"
              aria-label="small"
              value={volume}
              onChange={handleVolumeChange}
              color="success"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Playingbar;
