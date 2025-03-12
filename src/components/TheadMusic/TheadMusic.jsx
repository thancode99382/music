import { useEffect, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useContext } from "react";
import SearchContext from "../../layouts/components/Siderbar/SearchContext";

function TheadMusic() {
  const { isMobile } = useContext(SearchContext);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    try {
      const scrolledPosition = document.querySelector(".scrollChange");
      if (scrolledPosition) {
        const scrollTop = scrolledPosition.scrollTop;
        if (scrollTop > 400) {
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

  return (
    <div
      className={`text-neutral-400 text-[12px] md:text-[14px] border-b-[1px] font-bold border-neutral-700 grid grid-cols-12 px-2 md:px-5 transition-all duration-300 ease-in-out ${
        isScrolled
          ? `${isMobile ? "w-full" : "w-full"} fixed top-[65px] text-white bg-[#1A1A1A] py-1 z-40`
          : "py-2"
      }`}
    >
      <div className="col-span-1">#</div>
      <div className="col-span-4">Tiêu đề</div>
      <div className={`${isMobile ? "hidden" : ""} col-span-3`}>Thể loại</div>
      <div className={`${isMobile ? "col-span-7 text-right" : "col-span-3"}`}>
        {isMobile ? "Ngày" : "Ngày phát hành"}
      </div>
      <div className="hidden col-span-1 text-right md:block">
        <AccessTimeIcon fontSize="small" />
      </div>
    </div>
  );
}

export default TheadMusic;