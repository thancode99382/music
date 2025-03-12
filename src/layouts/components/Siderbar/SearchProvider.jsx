import { useEffect, useState } from "react";
import SearchContext from "./SearchContext";
import PropTypes from "prop-types";
import { defaultSong, defaultAlbum } from "../../../utils/defaultData";
import soulOfTheForest from "../../../utils/Api/soulOfTheForest/soulOfTheForest";

const SearchProvider = ({ children }) => {
  // Initialize with some default data
  const [listSongs, setListSongs] = useState(soulOfTheForest.alb[0]?.songs || []);
  const [isShowSearch, setIsShowSearch] = useState("home");
  const [currentAlbum, setCurrentAlbum] = useState(defaultAlbum);
  const [selectSong, setSelectSong] = useState(() => {
    // Try to get from local storage first
    const savedSong = localStorage.getItem("currentSong");
    if (savedSong) {
      try {
        return JSON.parse(savedSong);
      } catch (e) {
        console.error("Error parsing saved song", e);
        return soulOfTheForest.alb[0]?.songs[0] || defaultSong;
      }
    }
    return soulOfTheForest.alb[0]?.songs[0] || defaultSong;
  });

  const [isMobile, setIsMobile] = useState(false);

  // Save current song to localStorage when it changes
  useEffect(() => {
    if (selectSong && Object.keys(selectSong).length) {
      localStorage.setItem("currentSong", JSON.stringify(selectSong));
    }
  }, [selectSong]);

  useEffect(() => {
    // Check screen size and update isMobile state
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial state

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <SearchContext.Provider
      value={{
        setIsShowSearch,
        isShowSearch,
        listSongs,
        setListSongs,
        setCurrentAlbum,
        currentAlbum,
        setSelectSong,
        selectSong,
        isMobile,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchProvider;
