import IconHome from "../../../assets/images/Home_Fill_S.png";
import IconSearch from "../../../assets/images/Search_S.png";
import IconLibrary from "../../../assets/images/Library_S.png";
import { NavLink } from "react-router-dom";
import config from "../../../config/";
import { useState } from "react";
import { useContext } from "react";
import SearchContext from "./SearchContext";

function Siderbar() {
  const { setIsShowSearch, isMobile } = useContext(SearchContext);
  const [selectButton, setSelectButton] = useState("home");

  const activeButton = (name) => {
    setSelectButton(name);
    setIsShowSearch(name);
    const scrolledPosition = document.querySelector(".scrollChange");
    if (scrolledPosition) {
      scrolledPosition.scrollTo(0, 0);
    }
  };

  return (
    <div className="h-full text-white">
      <div className={`font-bold text-[12px] sm:text-[14px] md:text-[16px] ${isMobile ? "p-2" : "p-3 sm:p-4 md:p-5"} space-y-3 sm:space-y-4 md:space-y-5 bg-[#121212] rounded-lg text-neutral-400 h-auto`}>
        <NavLink to={config.routes.Home}>
          <div
            onClick={() => activeButton("home")}
            className={`flex gap-2 sm:gap-3 md:gap-6 items-center group ${
              selectButton === "home" ? "text-neutral-50" : ""
            }`}
          >
            <div>
              <img className="w-4 h-4 sm:w-5 sm:h-5" src={IconHome} alt="Home" />
            </div>
            <div>
              <button>
                <span className={`group-hover:underline group-hover:text-white ${isMobile ? "hidden" : "hidden sm:inline"}`}>
                  Trang chủ
                </span>
              </button>
            </div>
          </div>
        </NavLink>
        
        <NavLink to={config.routes.Search}>
          <div
            onClick={() => activeButton("search")}
            className={`flex gap-2 sm:gap-3 md:gap-6 items-center group ${
              selectButton === "search" ? "text-neutral-50" : ""
            }`}
          >
            <div>
              <img className="w-4 h-4 sm:w-5 sm:h-5" src={IconSearch} alt="Search" />
            </div>
            <button>
              <span className={`group-hover:underline group-hover:text-white ${isMobile ? "hidden" : "hidden sm:inline"}`}>
                Tìm kiếm
              </span>
            </button>
          </div>
        </NavLink>
      </div>
      
      {/* Library section */}
      <div className={`mt-2 bg-[#121212] font-bold text-[12px] sm:text-[14px] md:text-[16px] ${isMobile ? "p-2" : "p-3 sm:p-4 md:p-5"} space-y-3 sm:space-y-4 md:space-y-5 rounded-lg ${isMobile ? "max-h-[calc(100vh-160px)]" : ""} overflow-auto`}>
        <NavLink to={config.routes.Library}>
          <div
            onClick={() => activeButton("library")}
            className={`flex gap-2 sm:gap-3 md:gap-6 items-center group text-neutral-400 ${
              selectButton === "library" ? "text-neutral-50" : ""
            }`}
          >
            <div>
              <img className="w-4 h-4 sm:w-5 sm:h-5" src={IconLibrary} alt="Library" />
            </div>
            <button>
              <span className={`group-hover:underline group-hover:text-white ${isMobile ? "hidden" : "hidden sm:inline"}`}>
                Thư viện
              </span>
            </button>
          </div>
        </NavLink>
        
        {!isMobile && (
          <div className="hidden sm:block">
            <div className="p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4 md:space-y-5 rounded-lg bg-[#242424]">
              <div className="space-y-1 sm:space-y-2">
                <div className="text-xs sm:text-sm md:text-base">Tạo danh sách phát đầu tiên của bạn</div>
                <div className="text-[12px] sm:text-[14px] font-medium">
                  Rất dễ chúng tôi sẽ giúp bạn
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="px-2 sm:px-3 md:px-4 py-1 text-[12px] sm:text-[14px] text-black transition bg-white rounded-full hover:scale-105"
                >
                  Tạo danh sách phát
                </button>
              </div>
            </div>

            <div className="mt-2 p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4 md:space-y-5 rounded-lg bg-[#242424]">
              <div className="space-y-1 sm:space-y-2">
                <div className="text-xs sm:text-sm md:text-base">Hãy cùng tìm và theo dõi podcast</div>
                <div className="text-[12px] sm:text-[14px] font-medium">
                  Chúng tôi sẽ cập nhật các tập mới
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="px-2 sm:px-3 md:px-4 py-1 text-[12px] sm:text-[14px] text-black transition bg-white rounded-full hover:scale-105"
                >
                  Duyệt xem podcast
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Siderbar;
