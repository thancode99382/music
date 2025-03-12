import ContainerMusic from "../../components/ContainerMusic";
import { useContext, useEffect } from "react";
import SearchContext from "../../layouts/components/Siderbar/SearchContext";
import TbodyMusic from "../../components/TbodyMusic/TbodyMusic";
import TheadMusic from "../../components/TheadMusic";
import { useParams, useNavigate } from "react-router-dom";

function PlayingMusic() {
  const { listSongs, selectSong } = useContext(SearchContext);
  const { namesongpl } = useParams();
  const navigate = useNavigate();

  // Redirect if song doesn't match URL parameter
  useEffect(() => {
    if (selectSong?.name && namesongpl && selectSong.name !== namesongpl) {
      navigate(`/playingmusic/${selectSong.name}`, { replace: true });
    }
  }, [selectSong?.name, namesongpl, navigate]);

  if (!selectSong || !listSongs || listSongs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-white">
        <div className="p-5 text-center">
          <h2 className="mb-2 text-xl font-bold">No Music Selected</h2>
          <p className="text-neutral-400">Please select a song to play</p>
        </div>
      </div>
    );
  }

  return (
    <ContainerMusic currentAlbum={selectSong}>
      <TheadMusic />
      {listSongs.map((song) => (
        <TbodyMusic key={song.id} song={song} />
      ))}
    </ContainerMusic>
  );
}

export default PlayingMusic;
