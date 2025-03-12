import { useContext } from "react";
import SearchContext from "../../layouts/components/Siderbar/SearchContext";
import PropTypes from "prop-types";

function Genre({ id, genre, bg, img }) {
  const { isMobile } = useContext(SearchContext);
  
  return (
    <div
      key={id}
      className={`rounded-lg overflow-hidden p-2 sm:p-3 md:p-5 relative h-[100px] sm:h-[150px] md:h-[200px]`} 
      style={{ backgroundColor: `${bg}` }}
    >
      <div className="text-base sm:text-xl md:text-[24px] font-bold text-white">{genre}</div>
      <img
        className="absolute bottom-[-20px] right-[-20px] w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[130px] md:h-[130px] rotate-45 object-cover"
        src={img}
        alt={genre}
        onError={(e) => {e.target.src = "https://via.placeholder.com/130"}}
      />
    </div>
  );
}

Genre.propTypes = {
  id: PropTypes.any.isRequired,
  genre: PropTypes.string.isRequired,
  bg: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default Genre;
