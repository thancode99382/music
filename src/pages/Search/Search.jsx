import Genre from "../../components/Genre";
import ApiGenre from "../../utils/Api/ApiGenre";
import { useContext } from "react";
import SearchContext from "../../layouts/components/Siderbar/SearchContext";

function Search() {
  const { isMobile } = useContext(SearchContext);
  
  return (
    <div className="p-2 mt-8 sm:p-3 md:p-5 sm:mt-14 md:mt-24">
      <div className="mb-3 text-lg font-bold text-white sm:text-xl md:text-2xl sm:mb-4 md:mb-5">
        Duyệt tìm tất cả
      </div>
      <div className={`grid ${isMobile ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"} gap-2 sm:gap-3 md:gap-4`}>
        {ApiGenre.map((g) => (
          <Genre 
            key={g.id} 
            id={g.id} 
            genre={g.genre} 
            bg={g.bg} 
            img={g.img} 
          />
        ))}
      </div>
    </div>
  );
}

export default Search;
