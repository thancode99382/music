import CardPlayList from "../../components/CardPlayList";
import ApiAlbums from "../../utils/Api/ApiAlbum";
import soulOfTheForest from "../../utils/Api/soulOfTheForest/soulOfTheForest";
import { useContext } from "react";
import SearchContext from "../../layouts/components/Siderbar/SearchContext";

function Home() {
  const { isMobile } = useContext(SearchContext);
  
  return (
    <div className="p-2 mt-8 sm:p-3 md:p-5 sm:mt-10 md:mt-14">
      <div className="mb-3 text-lg font-bold text-white sm:text-xl md:text-2xl sm:mb-4 md:mb-5">
        Soul Of The Forest
      </div>

      <div className={`grid ${isMobile ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"} gap-2 sm:gap-3 md:gap-4 lg:gap-5`}>
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
      
      <div className="mt-4 sm:mt-6 md:mt-8">
        <div className="mb-3 text-lg font-bold text-white sm:text-xl md:text-2xl sm:mb-4 md:mb-5">
          Nổi Bật Dành Cho Bạn
        </div>

        <div className={`grid ${isMobile ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"} gap-2 sm:gap-3 md:gap-4 lg:gap-5`}>
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
