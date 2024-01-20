import PropTypes from "prop-types";
import Nav from "../Nav/Nav";
import { useContext } from "react";
import SearchContext from "../Siderbar/SearchContext";
function Main({ children }) {
  const {isMobile} = useContext(SearchContext)
  return (
    <div className={`bg-gradient-to-b from-[#222222] to-[#121212] rounded-lg ${isMobile?"w-[320px]":"w-[1110px]"}  h-[611px] overflow-y-scroll scrollChange scroll-smooth `    }>
      <Nav />
      {children}
      
    </div>
  );
}
Main.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Main;
