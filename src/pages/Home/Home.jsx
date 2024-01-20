import CardPlayList from "../../components/CardPlayList";
import ApiAlbums from "../../utils/Api/ApiAlbum";
import soulOfTheForest from "../../utils/Api/soulOfTheForest/soulOfTheForest";
function Home() {
  return (
    <div className="mt-14  p-5 ">
      <div className="text-[24px] font-bold text-white mb-5  ">
        Soul Of The Forest
      </div>

      <div className=" grid grid-cols-5 gap-5">
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
        <div className="text-[24px] font-bold text-white mb-5  ">
          Nổi Bật Dành Cho Bạn
        </div>

        <div className=" grid grid-cols-5 gap-5">
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
