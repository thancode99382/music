import Genre from "../../components/Genre";
import ApiGenre from "../../utils/Api/ApiGenre";
import { useContext } from "react";
import SearchContext from "../../layouts/components/Siderbar/SearchContext";
function Search() {
  const {isMobile} = useContext(SearchContext)
  return (
    <div className="mt-24  p-5 ">
      <div className="text-[24px] font-bold text-white mb-5  "> Duyệt tìm tất cả</div>
      <div className={`grid ${isMobile?"grid-cols-1":"grid-cols-5"}  gap-[15px]`}>
        {console.log(ApiGenre)}
        {ApiGenre.map((g) => {
          return <Genre key={g.id} id={g.id} genre={g.genre} bg={g.bg} img={g.img} />;
        })}
      </div>
    </div>
  );
}

export default Search;
