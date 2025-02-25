import { useContext } from "react";
import SearchContext from "../../layouts/components/Siderbar/SearchContext";
function Genre({ id, genre, bg,img }) {

  const{isMobile} = useContext(SearchContext)
  return (
    <div
      key={id}
      className={`  ${isMobile?"":"w-[200px] h-[200px] "}  rounded-lg overflow-hidden p-5 relative`} style={{backgroundColor:`${bg}`}}
    >
      <div className="text-[24px] font-bold text-white"> {genre} </div>
      <img
        className=" absolute  bottom-[-20px] right-[-20px] w-[130px] h-[130px] rotate-45"
        src={img}
        alt=""
      />
    </div>
  );
}

export default Genre;
