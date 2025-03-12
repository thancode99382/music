
import PropTypes from 'prop-types';
import { Search } from "@mui/icons-material";

function SearchBox({ width, height, placeholder, onChange, value, isMobile }) {
  return (
    <div 
      className={`flex items-center ${width} rounded-full ${height} 
                  bg-neutral-800 group focus-within:ring-1 focus-within:ring-white 
                  hover:bg-neutral-700 pl-2 sm:pl-3 transition-all duration-300 ease-in-out`}
    >
      <Search fontSize={isMobile ? "small" : "medium"} />
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-full px-1 text-sm text-white placeholder-white bg-transparent rounded-full outline-none sm:px-2 sm:text-base"
        type="text"
      />
    </div>
  );
}

SearchBox.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  isMobile: PropTypes.bool
};

SearchBox.defaultProps = {
  width: "w-full",
  height: "h-[40px]",
  placeholder: "Search...",
  onChange: () => {},
  value: "",
  isMobile: false
};

export default SearchBox;
