import Box from "@mui/material/Box";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import Slider from "@mui/material/Slider";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import ReplayIcon from "@mui/icons-material/Replay";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SpeakerIcon from "@mui/icons-material/Speaker";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { useEffect, useRef, useState } from "react";
import { VolumeDown } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { useContext } from "react";
import SearchContext from "../Siderbar/SearchContext";
import { Link } from "react-router-dom";
import config from "../../../config";
function Playingbar() {
  const audioRef = useRef(null);
  const [isPlay, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentSong, setCurrentSong] = useState();
  const { selectSong, setSelectSong } = useContext(SearchContext);
  const { listSongs,isMobile } = useContext(SearchContext);

 

  useEffect(() => {
    if (selectSong.audio && selectSong.audio !== currentSong?.audio) {
      setCurrentSong(selectSong);
      setPlay(true);

      audioRef.current.src = selectSong.audio;
      audioRef.current.play();
    }
  }, [selectSong, currentSong?.audio]);

  const handlePlay = () => {
    setPlay((prevIsPlay) => {
      if (prevIsPlay) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      return !prevIsPlay;
    });
  };

  useEffect(() => {
    const handleTimeUpDate = () => {
      setCurrentTime(audioRef.current.currentTime);

      if (audioRef.current.currentTime === audioRef.current.duration) {
        setPlay(false);
      }
    };

    const handleDurationChange = () => {
      setDuration(audioRef.current.duration);
    };

    const handleVolumeChange = () => {
      setVolume(audioRef.current.volume);
    };
    const KeySpace = (event) => {
      if (event.code === "Space") {
        handlePlay();
      }
    };
    audioRef.current.addEventListener("timeupdate", handleTimeUpDate);
    audioRef.current.addEventListener("loadedmetadata", handleDurationChange);
    audioRef.current.addEventListener("volumechange", handleVolumeChange);

    document.addEventListener("keydown", KeySpace);
    return () => {
      audioRef.current.removeEventListener("timeupdate", handleTimeUpDate);
      audioRef.current.removeEventListener(
        "loadedmetadata",
        handleDurationChange
      );

      audioRef.current.removeEventListener("volumechange", handleVolumeChange);
      document.removeEventListener("keydown", KeySpace);
    };
  }, []);

  const handleVolumeChange = (e, newValue) => {
    audioRef.current.volume = newValue;
    setVolume(newValue);
  };

  const handleSeek = (e, newValue) => {
    audioRef.current.currentTime = newValue;
    setCurrentTime(newValue);
  };
  //prev Song
  const handlePrevSong = (id) => {
    if (id > 1) {
      id = id - 1;
      setSelectSong(listSongs[id - 1]);
    }
    // const currentIndex = listSongs.findIndex((song) => song.audio === selectSong.audio);
    // if (currentIndex > 0) {
    //   const prevSong = listSongs[currentIndex - 1];
    //   setSelectSong(prevSong);
    // }
  };

  //next Song
  const handleNextSong = (id) => {
    console.log("đsdssdvd");
    if (id < listSongs.length) {
      id = id - 1;
      setSelectSong(listSongs[id + 1]);
    }
    // const currentIndex = listSongs.findIndex((song) => song.audio === selectSong.audio);
    // if (currentIndex < listSongs.length - 1) {
    //   const nextSong = listSongs[currentIndex + 1];
    //   setSelectSong(nextSong);
    // }
  };

  //random song
  const RandomSong = () => {
    const SongRandom = Math.floor(Math.random() * listSongs.length);

    setSelectSong(listSongs[SongRandom]);
  };

  return (

    <div className={`  pt-5  text-white ${isMobile?"h-[213px] ":"justify-between flex  "}  items-center `}>
      <audio ref={audioRef} src={selectSong.audio} type="audio/mpeg" />

      <div className="flex items-center gap-5 ">
        <Link
          onClick={() => {
            const scrolledPosition = document.querySelector(".scrollChange");
            scrolledPosition.scrollTo(0, 0);
          }}
          className="flex gap-2 w-[300px] shrink-0 overflow-hidden whitespace-nowrap overflow-ellipsis "
          to={`${config.routes.PlayingMusic}/${selectSong.name}`}
        >
          <div>
            <img
              className=" bg-black h-[56px] w-[56px] rounded-lg"
              src={selectSong.img}
              alt=""
            />
          </div>
          <div>
            <div className="font-semibold"> {selectSong.name}</div>
            <div className="text-[#B3B3B3] font-semibold text-[14px]">
              {selectSong.sing}
            </div>
          </div>
        </Link>
        <div>
          <button>
            <FavoriteBorderIcon />
          </button>
        </div>
      </div>
      <div>
        <div className={`flex justify-center items-center  gap-4 text-neutral-500`}>
          <button>
            <ShuffleIcon className="hover:text-white" onClick={RandomSong} />
          </button>
          <button>
            <SkipPreviousIcon className="hover:text-white" onClick={() => handlePrevSong(selectSong.id)} />
          </button>

          <button
            onClick={handlePlay}
            className="p-1 text-black bg-white rounded-full"
          >
            {isPlay ? <PauseRounded /> : <PlayArrowRounded />}
          </button>
          <button>
            <SkipNextIcon className="hover:text-white" onClick={() => handleNextSong(selectSong.id)} />
          </button>
          <button
            onClick={() => {
              setCurrentTime(1);
              audioRef.current.currentTime = 1;
            }}
          >
            <ReplayIcon className="hover:text-white" />
          </button>
        </div>
        <div className="flex gap-3 font-sans text-[12px] text-neutral-400 items-center">
          <div>
            {" "}
            {`${Math.floor(duration / 60)}:${
              Math.floor(duration % 60) < 10
                ? "0" + Math.floor(duration % 60)
                : Math.floor(duration % 60)
            }`}
          </div>
          <Box className="" sx={{ width: 500 }}>
            <Slider
              min={1}
              max={duration}
              size="small"
              aria-label="small"
              step={0.01}
              onChange={handleSeek}
              value={currentTime}
              color="success"
            />
          </Box>
          <div>
            {" "}
            {`${Math.floor(currentTime / 60)}:${
              Math.floor(currentTime % 60) < 10
                ? "0" + Math.floor(currentTime % 60)
                : Math.floor(currentTime % 60)
            }`}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 pr-10">
        <Tooltip title="Danh sách nhạc " placement="top">
          <button>
            <PlaylistPlayIcon />
          </button>
        </Tooltip>
        <Tooltip title="Danh sách nhạc " placement="top"></Tooltip>
        <Tooltip title="Micro " placement="top">
          <button>
            <KeyboardVoiceIcon />
          </button>
        </Tooltip>
        <Tooltip title="Tune " placement="top">
          <button>
            <TuneIcon />
          </button>
        </Tooltip>

        <Tooltip title="Loa " placement="top">
          <button>
            <SpeakerIcon />
          </button>
        </Tooltip>
        <VolumeDown />

        <Slider
          sx={{ width: 60 }}
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
    </div>
  );
}

export default Playingbar;
