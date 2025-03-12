import Main from "../components/Main";
import Siderbar from "../components/Siderbar";
import Playingbar from "../components/Playingbar";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import SearchContext from "../components/Siderbar/SearchContext";
import { defaultSong } from "../../utils/defaultData";
import soulOfTheForest from "../../utils/Api/soulOfTheForest/soulOfTheForest";
import AppLoader from "../../components/AppLoader";

function Defaultlayout({ children }) {
  const { isMobile, selectSong, setSelectSong, listSongs } = useContext(SearchContext);
  const [loading, setLoading] = useState(true);
  
  // Initialize default song if none is selected
  useEffect(() => {
    // Check if selectSong is empty or doesn't have an ID
    if (!selectSong?.id && listSongs && listSongs.length > 0) {
      const firstSong = listSongs[0];
      console.log("Setting default song:", firstSong);
      setSelectSong(firstSong);
    } else if (!listSongs || listSongs.length === 0) {
      // If no songs in the list, try to get songs from soulOfTheForest
      if (soulOfTheForest?.alb?.[0]?.songs?.length > 0) {
        console.log("Setting songs from soulOfTheForest");
        const initialSongs = soulOfTheForest.alb[0].songs;
        setSelectSong(initialSongs[0]);
      } else {
        // Fallback to default song if no songs available
        console.log("Using default song");
        setSelectSong(defaultSong);
      }
    }
    
    // Simulate loading of resources
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [listSongs, selectSong, setSelectSong]);

  if (loading) {
    return <AppLoader />;
  }

  return (
    <div className="relative h-screen overflow-hidden bg-black font-font">
      {/* Main layout grid */}
      <div className="grid grid-cols-12 h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className={`${isMobile ? "col-span-2" : "col-span-3 xl:col-span-2"} p-1 sm:p-2 md:p-3 lg:p-4`}>
          <div className="h-full overflow-hidden">
            <Siderbar />
          </div>
        </div>

        {/* Main Content */}
        <div className={`${isMobile ? "col-span-10" : "col-span-9 xl:col-span-10"} p-1 sm:p-2 md:p-3 lg:p-4`}>
          <div className="h-full overflow-hidden rounded-lg bg-gradient-to-b from-[#222222] to-[#121212]">
            <Main>{children}</Main>
          </div>
        </div>
      </div>

      {/* Playing Bar */}
      <div className="fixed left-0 right-0 bottom-0 bg-[#181818] px-1 sm:px-2 md:px-5 shadow-lg border-t border-neutral-800">
        <Playingbar />
      </div>
    </div>
  );
}

Defaultlayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Defaultlayout;
