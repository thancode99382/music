import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import SearchContext from "../../layouts/components/Siderbar/SearchContext";
function TbodyMusic({ song }) {
  const { setSelectSong, selectSong } = useContext(SearchContext);

  const [playingSong, setPlayingSong] = useState(false);
  useEffect(() => {
    if (selectSong.id === song.id) {
      setPlayingSong(true);
    } else {
      setPlayingSong(false);
    }
  }, [selectSong, playingSong, song]);

  const handlePlaySong = (song) => {
    setSelectSong(song);
  };

  return (
    <div>
      <div className="p-1 ">
        <div
          onClick={() => handlePlaySong(song)}
          className={`font-bold text-neutral-400 hover:text-white ${
            playingSong ? "bg-neutral-500 bg-opacity-40" : ""
          }  hover:bg-neutral-500 hover:bg-opacity-40  grid grid-cols-12 items-center cursor-pointer rounded-sm px-5 py-1 `}
        >
          <div className="col-span-1  ">{song.id}</div>
          <div className="flex items-center gap-3  col-span-4">
            <div>
              <img className="w-10 rounded-md" src={song.img} alt="" />
            </div>
            <div>
              <div className="text-white">{song.name}</div>
              <div className="text-[14px] ">{song.sing}</div>
            </div>
          </div>
          <div className=" col-span-3 text-[14px]">Sky tour</div>
          <div className=" col-span-3 text-[14px]">6 ngày trước</div>
          <div className="col-span-1 text-[14px]">19:61</div>
        </div>
      </div>
    </div>
  );
}
TbodyMusic.propTypes = {
  song: PropTypes.object.isRequired,
};

export default TbodyMusic;
