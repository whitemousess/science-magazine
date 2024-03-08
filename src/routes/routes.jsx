// routeConfig
import config from "~/config";
import { ManagerLayout } from "~/layouts";
import { Login, Register } from "~/pages/Auth";
import DetailArticles from "~/pages/DetailArticles";

// Router change Pages
import Home from "~/pages/Home";
import NewArticle from "~/pages/NewArticle";
import { UserAdmin, ArticlesAdmin, HomeManager } from "~/pages/Manager";
import Profile from "~/pages/Profile";
import Favorites from "~/pages/Favorites";
import EditProfile from "~/pages/Profile/EditProfile";
import Articles from "~/pages/Articles";

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.articles, component: Articles },
  { path: config.routes.detailArticles, component: DetailArticles },
  { path: config.routes.newArticle, component: NewArticle },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.editProfile, component: EditProfile },
  { path: config.routes.favorites, component: Favorites },

  { path: config.routes.login, component: Login, Layout: null },
  { path: config.routes.register, component: Register, Layout: null },

  {
    path: config.routes.homeManager,
    component: HomeManager,
    Layout: ManagerLayout,
  },
  {
    path: config.routes.userAdmin,
    component: UserAdmin,
    Layout: ManagerLayout,
  },
  {
    path: config.routes.articlesAdmin,
    component: ArticlesAdmin,
    Layout: ManagerLayout,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
