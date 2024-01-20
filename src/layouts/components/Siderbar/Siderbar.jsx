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
    console.log(name);
    setSelectButton(name);
    setIsShowSearch(name);
    const scrolledPosition = document.querySelector(".scrollChange");
    scrolledPosition.scrollTo(0, 0);
  };

  return (
    <div className={` text-white ${isMobile ? "w-[60px]" : "w-[400px]"} `}>
      <div
        className={`font-bold text-[16px] ${isMobile?"p-1":"p-5"}  space-y-5 bg-[#121212] rounded-lg text-neutral-400`}
      >
        <NavLink to={config.routes.Home}>
          <div
            onClick={() => activeButton("home")}
            className={`flex gap-6 items-center group ${
              selectButton === "home" ? "text-neutral-50" : ""
            }`}
          >
            <div>
              <img className="w-5 h-5" src={IconHome} alt="" />
            </div>
            <div>
              <button>
                <span className={`"group-hover:underline group-hover:text-white ${isMobile?"hidden":""} "`}>
                  Trang chủ
                </span>{" "}
              </button>
            </div>
          </div>{" "}
        </NavLink>
        <div>
          <NavLink to={config.routes.Search}>
            <div
              onClick={() => activeButton("search")}
              className={`flex gap-6 items-center group ${
                selectButton === "search" ? "text-neutral-50" : ""
              }`}
            >
              <div>
                <img className="w-5 h-5 " src={IconSearch} alt="" />
              </div>
              <button>
                <span className={`group-hover:underline group-hover:text-white ${isMobile?"hidden":""} `}>
                  Tìm kiếm{" "}
                </span>
              </button>
            </div>
          </NavLink>
        </div>
      </div>
      {/* */}
      <div className="mt-2 bg-[#121212] h-[495px] font-bold text-[16px] p-5 space-y-5 rounded-lg  ">
        <NavLink>
          <div
            onClick={() => activeButton("library")}
            className={`flex gap-6 items-center group text-neutral-400 ${
              selectButton === "library" ? "text-neutral-50" : ""
            }`}
          >
            <div>
              <img className="w-5 h-5 " src={IconLibrary} alt="" />
            </div>
            <button>
              <span className={`group-hover:underline group-hover:text-white ${isMobile?"hidden":""} `}>
                Thư viện{" "}
              </span>
            </button>
          </div>
        </NavLink>
        <div
          className={`bg-[#242424] p-5 rounded-lg space-y-5 ${
            isMobile ? "hidden" : ""
          } `}
        >
          <div className="space-y-2">
            <div>Tạo danh sách phát đầu tiên của bạn</div>
            <div className="text-[14px] font-medium">
              Rất dễ chúng tôi sẽ giúp bạn
            </div>
          </div>
          <div>
            <button
              type="button"
              className="bg-white text-black py-1 px-4 rounded-full text-[14px] hover:scale-105"
            >
              Tạo danh sách phát{" "}
            </button>
          </div>
        </div>

        <div
          className={`bg-[#242424] p-5 rounded-lg space-y-5 ${
            isMobile ? "hidden" : ""
          }`}
        >
          <div className="space-y-2">
            <div>Hãy cùng tìm và theo dõi một số postcast </div>
            <div className="text-[14px] font-medium">
              Chúng tôi sẽ cập nhật cho bạn các tập mới{" "}
            </div>
          </div>
          <div>
            <button
              type="button"
              className="bg-white text-black py-1 px-4 rounded-full text-[14px] hover:scale-105"
            >
              Duyệt xem podcast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Siderbar;
