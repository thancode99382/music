import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import SearchContext from "../../layouts/components/Siderbar/SearchContext";

function TbodyMusic({ song }) {
  const { setSelectSong, selectSong, isMobile } = useContext(SearchContext);
  const [playingSong, setPlayingSong] = useState(false);
  
  useEffect(() => {
    if (selectSong && song && selectSong.id === song.id) {
      setPlayingSong(true);
    } else {
      setPlayingSong(false);
    }
  }, [selectSong, song]);

  const handlePlaySong = (song) => {
    if (song && song.audio) {
      setSelectSong(song);
    } else {
      console.error("Invalid song or missing audio:", song);
    }
  };

  if (!song) {
    return null;
  }

  return (
    <div>
      <div className="p-[2px] sm:p-1">
        <div
          onClick={() => handlePlaySong(song)}
          className={`font-bold text-neutral-400 hover:text-white ${
            playingSong ? "bg-neutral-500 bg-opacity-40 text-white" : ""
          } hover:bg-neutral-500 hover:bg-opacity-40 grid grid-cols-12 items-center cursor-pointer rounded-sm px-1 sm:px-2 md:px-5 py-1`}
        >
          <div className="col-span-1 text-[10px] sm:text-xs md:text-base">{song.id}</div>
          <div className="flex items-center col-span-5 gap-1 sm:col-span-4 sm:gap-2 md:gap-3">
            <div>
              <img 
                className="object-cover w-6 h-6 rounded-md sm:w-8 sm:h-8 md:w-10 md:h-10" 
                src={song.img} 
                alt={song.name}
                onError={(e) => {e.target.src = "https://via.placeholder.com/40"}} 
              />
            </div>
            <div className="truncate">
              <div className="text-white truncate text-[10px] sm:text-xs md:text-base">{song.name}</div>
              <div className="text-[8px] sm:text-[10px] md:text-[14px] truncate">{song.sing}</div>
            </div>
          </div>
          <div className={`${isMobile ? "hidden" : "hidden md:block"} col-span-3 text-[10px] sm:text-xs md:text-sm truncate`}>
            {song.album || "Spotify"}
          </div>
          <div className={`${isMobile ? "col-span-6" : "col-span-7 md:col-span-3"} text-[8px] sm:text-[10px] md:text-sm truncate text-right md:text-left`}>
            {song.date || "Mới phát hành"}
          </div>
          <div className="hidden md:block col-span-1 text-[10px] sm:text-xs md:text-sm text-right">
            {song.duration || "3:30"}
          </div>
        </div>
      </div>
    </div>
  );
}

TbodyMusic.propTypes = {
  song: PropTypes.object.isRequired,
};

export default TbodyMusic;
