import { useEffect, useState } from "react";
import SearchContext from "./SearchContext";

import PropTypes from "prop-types";

const SearchProvider = ({ children }) => {
  // mượn tạm search để lưu trữ hehee thank ui
  const [listSongs, setListSongs] = useState([]);
  const [isShowSearch, setIsShowSearch] = useState();
  const [currentAlbum, setCurrentAlbum] = useState({});
  const [selectSong, setSelectSong] = useState({});

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Kiểm tra kích thước màn hình và cập nhật trạng thái isMobile
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767); // Giả sử màn hình điện thoại có độ rộng tối đa 767px
    };

    // Gọi hàm handleResize khi kích thước màn hình thay đổi
    window.addEventListener("resize", handleResize);

    // Gọi hàm handleResize khi component được mount để xác định trạng thái ban đầu
    handleResize();

    // Cleanup khi component unmount
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
