// routeConfig
import config from "~/config";
import { ManagerLayout } from "~/layouts";
import { Login, Register } from "~/pages/Auth";
import DetailArticles from "~/pages/DetailArticles";

// Router change Pages
import Home from "~/pages/Home";
import NewArticle from "~/pages/NewArticle";
import { UserAdmin, ArticlesAdmin, EditUser } from "~/pages/Manager";
import Profile from "~/pages/Profile";
import Favorites from "~/pages/Favorites";
import EditProfile from "~/pages/Profile/EditProfile";
import Articles from "~/pages/Articles";
import EditArticle from "~/pages/EditArticle";
import NotFound from "~/components/NotFound";

const publicRoutes = [
  { path: config.routes.notfound, component: NotFound },

  { path: config.routes.home, component: Home },
  { path: config.routes.articles, component: Articles },
  { path: config.routes.detailArticles, component: DetailArticles },
  { path: config.routes.newArticle, component: NewArticle },
  { path: config.routes.editArticle, component: EditArticle },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.editProfile, component: EditProfile },
  { path: config.routes.favorites, component: Favorites },

  { path: config.routes.login, component: Login, Layout: null },
  { path: config.routes.register, component: Register, Layout: null },

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
  {
    path: config.routes.editUser,
    component: EditUser,
    Layout: ManagerLayout,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
