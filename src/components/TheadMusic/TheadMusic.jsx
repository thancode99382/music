import { useEffect, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useContext } from "react";
import SearchContext from "../../layouts/components/Siderbar/SearchContext";
function TheadMusic() {
  const { isMobile} = useContext(SearchContext)
    const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const scrolledPosition = document.querySelector(".scrollChange").scrollTop;
    
    if (scrolledPosition > 400) {
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

        <div
              className={` text-neutral-400 text-[14px] border-b-[1px] font-bold border-neutral-700  grid grid-cols-12 px-5 transition-all duration-300 ease-in-out  ${
                isScrolled
                  ? ` ${isMobile?"w-[310px] ":" w-[1100px]"} fixed top-[75px] text-white bg-[#1A1A1A] py-1 z-50    `
                  : ""
              }  `}
            >
              <div className="col-span-1">#</div>
              <div className="col-span-4">Tiêu đề</div>
              <div className="col-span-3">Thể loại</div>
              <div className="col-span-3 ">Ngày</div>
              <div className="col-span-1 ">
                <AccessTimeIcon />
              </div>
            </div>
    );
}

export default TheadMusic;