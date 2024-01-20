import Main from "../components/Main";
import Siderbar from "../components/Siderbar";
import Playingbar from "../components/Playingbar";
import PropTypes from "prop-types";
import { useContext } from "react";
import SearchContext from "../components/Siderbar/SearchContext";
function Defaultlayout({ children }) {
  const { isMobile } = useContext(SearchContext);
  return (
    <div className="bg-black  p-[10px] font-font    ">
      <div
        className={`grid grid-cols-12 ${isMobile?"":"gap-32"}   `}
      >
        <div className={` ${isMobile?"col-span-2":"col-span-3"} `}>
          <Siderbar />
        </div>
        <div className={` ${isMobile?"col-span-10":"col-span-9"} `}>
          <Main> {children}</Main>
        </div>
      </div>
      <div className="">
        <Playingbar />
      </div>
    </div>
  );
}
Defaultlayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Defaultlayout;
