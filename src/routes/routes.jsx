// routeConfig
import config from "~/config";
import { ManagerLayout } from "~/layouts";
import { Login, Register } from "~/pages/Auth";

// Router change Pages
import Home from "~/pages/Home";
import {
  UserAdmin,
  ArticlesAdmin,
  HomeManager,
} from "~/pages/Manager";

const publicRoutes = [
  { path: config.routes.home, component: Home },

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
