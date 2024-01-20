import { useEffect } from "react";
import { useState } from "react";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import PersonIcon from "@mui/icons-material/Person";
import { Search } from "@mui/icons-material";
import { useContext } from "react";
import SearchContext from "../Siderbar/SearchContext";
function Nav() {
  const { isShowSearch ,isMobile } = useContext(SearchContext);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const scrolledPosition = document.querySelector(".scrollChange").scrollTop;
    
    if (scrolledPosition > 200) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    const scrolledPosition = document.querySelector(".scrollChange");
    scrolledPosition.addEventListener("scroll", handleScroll);
    return () => {
      scrolledPosition.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`  bg-${
        isScrolled ? "[#121212]" : "transparent"
      } fixed h-[65px] w-[1110px] rounded-t-lg transition-all duration-1000 ease-in-out z-50 flex items-center justify-between pr-8 pl-8 text-white  `}
    >
      <div>
        <div className={ `flex items-center ${isMobile?"w-[200px]":"w-[360px]"}  rounded-full h-[48px] ${isShowSearch==='search'?"":"opacity-0"} transition-all duration-300 ease-in-out bg-neutral-800 group focus:ring-1 focus:ring-white hover:bg-neutral-700 pl-3 `}>
          <Search />
          <input
            placeholder="Bạn muốn nghe gì "
            className="outline-none bg-transparent w-[360px] rounded-full placeholder-white h-[45px]    "
            type="text"
          />
        </div>
      </div>
      <div className="flex gap-3 font-bold">
        <div>
          <button
            type="button"
            className="bg-white text-black py-1 px-4 rounded-full text-[14px] hover:scale-105 "
          >
            Khám phá Premium
          </button>
        </div>
        <div>
          <button
            type="button"
            className="bg-white text-black py-1 px-4 rounded-full text-[14px] hover:scale-105"
          >
            Cài đặt ứng dung
          </button>
        </div>
        <button className="hover:scale-125">
          <CircleNotificationsIcon />
        </button>
        <button className="hover:scale-125">
          <PersonIcon />
        </button>
      </div>
    </nav>
  );
}

export default Nav;
