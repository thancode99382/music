import PropTypes from "prop-types";

function Main({ children }) {
  
  return (
    <div className="">
      {/* <Nav /> */}
      {children}
      
    </div>
  );
}
Main.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Main;
