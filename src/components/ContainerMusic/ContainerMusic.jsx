import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PropTypes from "prop-types";
import { useContext } from "react";
import SearchContext from "../../layouts/components/Siderbar/SearchContext";
function ContainerMusic({ children, currentAlbum }) {
  const { img, name, namesub ,sing } = currentAlbum;
  const {isMobile} = useContext(SearchContext)
  return (
    <div className=" relative   ">
      <div
        className="absolute inset-0 bg-cover blur-3xl h-[500px]   bg-no-repeat   "
        style={{
          backgroundImage: `url(${img})`,
        }}
      ></div>
      <div className={` pl-5 pb-10 grid grid-cols-12 relative z-10 top-[80px] items-center gap-5 text-white bg-gradient-to-t ${isMobile?"h-[150px]":""}  from-black  to-transparent`}>
        <div className="col-span-3">
          <img
            className="w-[230] h-[230] rounded-lg shadow-black shadow-xl
          "
            src={img}
            alt=""
          />
        </div>
        <div className="col-span-9 space-y-7 font-bold">
          <div className={` ${isMobile?"text-xs":"text-sm"} `}> Đĩa đơn</div>
          <div className={` ${isMobile?"text-base":"text-5xl"} `}> {name} </div>
          <div className={` ${isMobile?"text-xs":"text-sm"} `}> {sing||namesub} </div>
        </div>
      </div>
      {/* danh sách album  */}
      <div className="    relative top-[80px] bg-gradient-to-t from-black  to-transparent min-h-screen ">
        <div className=" flex items-center justify-between text-neutral-400 font-bold px-4 py-4">
          <div className="flex gap-8 items-center   ">
            <button>
              <PlayCircleIcon
                className="text-green-500"
                sx={{ fontSize: "70px" }}
              />
            </button>
            <button>
              <FavoriteBorderIcon
                sx={{ fontSize: "40px" }}
                className="hover:text-white  "
              />
            </button>

            <button>
              <PlaylistAddIcon
                className="hover:text-white "
                sx={{ fontSize: "40px" }}
              />
            </button>
          </div>
          <button className="font-font text-neuthal-300 hover:text-white ">
            Danh sách
          </button>
        </div>

        {/* list */}
        <div>
          <div className="w-full  text-left">{children}</div>
        </div>
      </div>
    </div>
  );
}
ContainerMusic.propTypes = {
  children: PropTypes.node.isRequired,
  currentAlbum: PropTypes.node.isRequired,
};
export default ContainerMusic;
