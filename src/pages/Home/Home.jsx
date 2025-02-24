import CardPlayList from "../../components/CardPlayList";
import ApiAlbums from "../../utils/Api/ApiAlbum";
import soulOfTheForest from "../../utils/Api/soulOfTheForest/soulOfTheForest";
import { useContext } from "react";
import SearchContext from "../../layouts/components/Siderbar/SearchContext";
function Home() {
  const { isMobile } = useContext(SearchContext);
  return (
    <div className="p-5 mt-14">
      <div className="text-[24px] font-bold text-white mb-5  ">
        Soul Of The Forest
      </div>

      <div className={` grid ${isMobile?"grid-cols-1":"grid-cols-5"}  gap-5`}>
        {soulOfTheForest.alb.map((album) => (
          <CardPlayList
            key={album.id}
            id={album.id}
            name={album.name}
            img={album.img}
            namesub={album.sing}
            songs={album.songs}
          />
        ))}
      </div>
      <div className="mt-5">
        <div className="text-[24px]  font-bold text-white mb-5  ">
          Nổi Bật Dành Cho Bạn
        </div>

        <div className={` grid ${isMobile?"grid-cols-1":"grid-cols-5"}  `}>
          {ApiAlbums.alb.map((album) => (
            <CardPlayList
              key={album.id}
              id={album.id}
              name={album.name}
              img={album.img}
              namesub={album.sing}
              songs={album.songs}
            />
          ))}
        </div> 
      </div>
    </div>
  );
}

export default Home;
