import ContainerMusic from "../../components/ContainerMusic";
import { useContext } from "react";
import SearchContext from "../../layouts/components/Siderbar/SearchContext";
import TbodyMusic from "../../components/TbodyMusic/TbodyMusic";
import TheadMusic from "../../components/TheadMusic";

function PlayingMusic() {
  const { listSongs, selectSong } = useContext(SearchContext);

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
