import Main from "../components/Main";
import Siderbar from "../components/Siderbar";
import Playingbar from "../components/Playingbar";
import PropTypes from "prop-types";
import { useContext } from "react";
import SearchContext from "../components/Siderbar/SearchContext";
function Defaultlayout({ children }) {
  const { isMobile } = useContext(SearchContext);
  return (
    <div className="relative h-screen p-10 overflow-hidden bg-black font-font">
    <div className={`grid grid-cols-12 ${isMobile ? "" : "gap-20"}`}>
      {/* Sidebar */}
      <div className="col-span-4">
        <Siderbar />
      </div>

      {/* Main Content */}
      <div className="col-span-8 h-[calc(100vh-9rem)] overflow-y-auto bg-gradient-to-b from-[#222222] to-[#121212] rounded-lg">
        <Main>{children}</Main>
      </div>
    </div>

    {/* Playing Bar */}
    <div className="absolute left-0 right-0 bottom-2">
      <Playingbar />
    </div>
  </div>
  );
}
Defaultlayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Defaultlayout;
