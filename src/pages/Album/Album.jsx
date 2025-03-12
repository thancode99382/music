import ContainerMusic from "../../components/ContainerMusic";
import TbodyMusic from "../../components/TbodyMusic";
import TheadMusic from "../../components/TheadMusic";
import { useContext, useEffect } from "react";
import SearchContext from "../../layouts/components/Siderbar/SearchContext";
import { useParams, useNavigate } from "react-router-dom";

function Album() {
  const { listSongs, currentAlbum } = useContext(SearchContext);
  const { namesong } = useParams();
  const navigate = useNavigate();

  // Redirect if album name doesn't match URL parameter
  useEffect(() => {
    if (currentAlbum?.name && namesong && currentAlbum.name !== namesong) {
      navigate(`/album/${currentAlbum.name}`, { replace: true });
    }
  }, [currentAlbum?.name, namesong, navigate]);
  
  if (!listSongs || listSongs.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-white">
        <div className="p-5 text-center">
          <h2 className="mb-2 text-xl font-bold">No Album Selected</h2>
          <p className="text-neutral-400">Please select an album to view its songs</p>
        </div>
      </div>
    );
  }
  
  return (
    <ContainerMusic currentAlbum={currentAlbum}>
      <TheadMusic />
      {listSongs.map((song) => (
        <TbodyMusic key={song.id} song={song} />
      ))}
    </ContainerMusic>
  );
}

export default Album;
