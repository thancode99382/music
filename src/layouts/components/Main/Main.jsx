import PropTypes from "prop-types";
import Nav from "../Nav/Nav";
import { useContext } from "react";
import SearchContext from "../Siderbar/SearchContext";

function Main({ children }) {
  const { isMobile } = useContext(SearchContext);
  
  return (
    <div className={`relative ${isMobile ? "px-1" : "px-2 md:px-5"}`}>
      <Nav />
      <div className="scrollChange overflow-y-auto h-[calc(100vh-160px)] sm:h-[calc(100vh-150px)] md:h-[calc(100vh-150px)] pb-16">
        {children}
      </div>
    </div>
  );
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Main;
