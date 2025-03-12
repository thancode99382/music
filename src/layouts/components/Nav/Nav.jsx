import { useEffect, useState } from "react";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import PersonIcon from "@mui/icons-material/Person";
import { useContext } from "react";
import SearchContext from "../Siderbar/SearchContext";
import SearchBox from "../../../components/SearchBox";

function Nav() {
  const { isShowSearch, isMobile } = useContext(SearchContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleScroll = () => {
    try {
      const scrolledPosition = document.querySelector(".scrollChange");
      if (scrolledPosition) {
        const scrollTop = scrolledPosition.scrollTop;
        if (scrollTop > 200) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    } catch (error) {
      console.error("Error in handleScroll:", error);
    }
  };

  useEffect(() => {
    try {
      const scrolledPosition = document.querySelector(".scrollChange");
      if (scrolledPosition) {
        scrolledPosition.addEventListener("scroll", handleScroll);
        return () => {
          scrolledPosition.removeEventListener("scroll", handleScroll);
        };
      }
    } catch (error) {
      console.error("Error setting up scroll listener:", error);
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Add search functionality here
  };

  return (
    <nav
      className={`sticky top-0 h-[50px] sm:h-[60px] md:h-[65px] w-full rounded-t-lg transition-all duration-500 ease-in-out z-50 flex items-center justify-between pr-1 pl-1 sm:pr-2 sm:pl-2 md:pr-4 md:pl-4 lg:pr-8 lg:pl-8 text-white ${
        isScrolled ? "bg-[#121212] bg-opacity-90 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className={`transition-opacity ${isShowSearch === 'search' ? "opacity-100" : "opacity-0"}`}>
        <SearchBox 
          width={isMobile ? "w-[120px] sm:w-[160px]" : "w-[240px] md:w-[360px]"}
          height="h-[36px] sm:h-[40px] md:h-[48px]"
          placeholder="Bạn muốn nghe gì"
          value={searchQuery}
          onChange={handleSearchChange}
          isMobile={isMobile}
        />
      </div>
      
      <div className="flex items-center gap-2 font-bold sm:gap-3">
        {!isMobile && (
          <>
            <div className="hidden sm:block">
              <button
                type="button"
                className="bg-white text-black py-1 px-2 md:px-4 rounded-full text-xs md:text-[14px] hover:scale-105 transition"
              >
                Khám phá Premium
              </button>
            </div>
            <div className="hidden md:block">
              <button
                type="button"
                className="bg-white text-black py-1 px-2 md:px-4 rounded-full text-xs md:text-[14px] hover:scale-105 transition"
              >
                Cài đặt ứng dụng
              </button>
            </div>
          </>
        )}
        <div className="flex gap-1 sm:gap-2">
          <button className="transition hover:scale-125">
            <CircleNotificationsIcon fontSize={isMobile ? "small" : "medium"} />
          </button>
          <button className="transition hover:scale-125">
            <PersonIcon fontSize={isMobile ? "small" : "medium"} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
