import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { green } from "@mui/material/colors";
import { useState } from "react";
import { Link } from "react-router-dom";
import config from "../../config/";
import { useContext } from "react";
import SearchContext from "../../layouts/components/Siderbar/SearchContext";
import PropTypes from "prop-types";

function CardPlayList({ id, name, img, namesub, songs }) {
  const [isShow, setIsShow] = useState(false);
  const { setListSongs, setCurrentAlbum, isMobile } = useContext(SearchContext);

  const handleAlbum = () => {
    setListSongs(songs);
    setCurrentAlbum({img, name, namesub})
  };

  return (
    <Link 
      className="relative inline-block p-2 space-y-2 text-white transition-all duration-200 ease-in-out rounded-lg cursor-pointer sm:p-3 md:p-5 sm:space-y-3 bg-neutral-900 hover:bg-neutral-800" 
      onClick={handleAlbum} 
      key={id} 
      to={`${config.routes.Album}/${name}`}
    >
      <div
        onMouseEnter={() => setIsShow(true)}
        onMouseLeave={() => setIsShow(false)}
        className="relative"
      >
        <div className="relative">
          <img
            src={img}
            alt={name}
            className="w-full h-auto max-w-[160px] rounded-lg shadow-lg object-cover aspect-square"
            onError={(e) => {e.target.src = "https://via.placeholder.com/160"}}
          />

          <div
            className={`absolute right-1 ${
              isShow ? "bottom-3 opacity-100" : "opacity-0 bottom-0"
            } transition-all duration-200 ease-linear`}
          >
            <PlayCircleFilledWhiteIcon
              sx={{ fontSize: isMobile ? 40 : 60, color: green[600] }}
            />
          </div>
        </div>
        <div>
          <div className="mt-2 space-y-1 sm:space-y-2">
            <div className="font-semibold text-xs sm:text-sm md:text-[16px] overflow-hidden whitespace-nowrap overflow-ellipsis">{name}</div>
            <div className="text-[#B3B3B3] font-semibold text-[10px] sm:text-xs md:text-[14px] truncate">
              {namesub}
            </div>
          </div>
        </div>
      </div>  
    </Link>
  );
}

CardPlayList.propTypes = {
  id: PropTypes.any.isRequired,
  name: PropTypes.any.isRequired,
  img: PropTypes.any.isRequired,
  namesub: PropTypes.any.isRequired,
  songs: PropTypes.any.isRequired,
};

export default CardPlayList;
