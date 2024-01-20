import ContainerMusic from "../../components/ContainerMusic";
import TbodyMusic from "../../components/TbodyMusic";
import TheadMusic from "../../components/TheadMusic";
import { useContext } from "react";
import SearchContext from "../../layouts/components/Siderbar/SearchContext";
function Album() {
  const { listSongs ,currentAlbum} = useContext(SearchContext);
  
  return (
    <ContainerMusic currentAlbum ={currentAlbum}>
      <TheadMusic />
      {listSongs.map((song) => (
        <TbodyMusic key={song.id} song={song}  />
      ))}
    </ContainerMusic>
  );
}

export default Album;
