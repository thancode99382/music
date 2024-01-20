import config from "../config";

// pages
import Home from "../pages/Home";
import Album from "../pages/Album";
import Library from "../pages/Library";
import PlayingMusic from "../pages/PlayingMusic";
import Search from "../pages/Search";

// routes

const publicRoutes = [
  { path: config.routes.Home, component: Home },
  { path: `${config.routes.Album}/:namesong`, component: Album },
  { path: config.routes.Library, component: Library },
  { path: `${config.routes.PlayingMusic}/:namesongpl`, component: PlayingMusic },
  { path: config.routes.Search, component: Search },
];

export default publicRoutes;
