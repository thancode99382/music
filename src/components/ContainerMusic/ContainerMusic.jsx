import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PropTypes from "prop-types";
import { useContext } from "react";
import SearchContext from "../../layouts/components/Siderbar/SearchContext";

function ContainerMusic({ children, currentAlbum }) {
  const { img, name, namesub, sing } = currentAlbum || {};
  const { isMobile } = useContext(SearchContext);
  
  if (!currentAlbum || !img) {
    return (
      <div className="p-5 text-center text-white mt-14">
        <h2 className="text-2xl font-bold">No album selected</h2>
        <p>Please select an album to view its content</p>
      </div>
    );
  }
  
  return (
    <div className="relative">
      <div
        className="absolute inset-0 bg-cover blur-3xl h-[350px] md:h-[500px] bg-no-repeat opacity-60"
        style={{
          backgroundImage: `url(${img})`,
        }}
      ></div>
      <div className={`pl-3 md:pl-5 pb-10 grid grid-cols-12 relative z-10 top-[80px] items-center gap-3 md:gap-5 text-white bg-gradient-to-t ${isMobile ? "h-[130px] md:h-[150px]" : ""} from-black to-transparent`}>
        <div className={`${isMobile ? "col-span-4" : "col-span-3"}`}>
          <img
            className="w-full max-w-[230px] rounded-lg shadow-black shadow-xl object-cover"
            src={img}
            alt={name}
            onError={(e) => {e.target.src = "https://via.placeholder.com/230"}}
          />
        </div>
        <div className={`${isMobile ? "col-span-8" : "col-span-9"} font-bold space-y-3 md:space-y-7`}>
          <div className={`${isMobile ? "text-xs" : "text-sm"}`}>Đĩa đơn</div>
          <div className={`${isMobile ? "text-base" : "text-5xl"}`}>{name}</div>
          <div className={`${isMobile ? "text-xs" : "text-sm"}`}>{sing || namesub}</div>
        </div>
      </div>
      {/* danh sách album */}
      <div className="relative top-[80px] bg-gradient-to-t from-black to-transparent min-h-screen">
        <div className="flex items-center justify-between px-2 py-4 font-bold md:px-4 text-neutral-400">
          <div className="flex items-center gap-3 md:gap-8">
            <button>
              <PlayCircleIcon
                className="text-green-500"
                sx={{ fontSize: isMobile ? "40px" : "70px" }}
              />
            </button>
            <button>
              <FavoriteBorderIcon
                sx={{ fontSize: isMobile ? "24px" : "40px" }}
                className="hover:text-white"
              />
            </button>

            <button>
              <PlaylistAddIcon
                className="hover:text-white"
                sx={{ fontSize: isMobile ? "24px" : "40px" }}
              />
            </button>
          </div>
          <button className="text-sm font-font text-neuthal-300 hover:text-white md:text-base">
            Danh sách
          </button>
        </div>

        {/* list */}
        <div>
          <div className="w-full text-left">{children}</div>
        </div>
      </div>
    </div>
  );
}

ContainerMusic.propTypes = {
  children: PropTypes.node.isRequired,
  currentAlbum: PropTypes.object.isRequired,
};

export default ContainerMusic;
