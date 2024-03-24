// move router

const routes = {
  notfound: "*",

  home: "/",
  profile: "/profile",
  editProfile: "/profile/edit",
  favorites: "/favorites",
  articles: "/articles",
  detailArticles: "/articles/:id",
  newArticle: "/articles/new",
  editArticle: "/articles/edit/:id",

  login: "/login",
  register: "/register",

  userAdmin: "/manager/home",
  editUser: "/manager/user-edit/:id",
  articlesAdmin: "/manager/admin/articles",
};

export default routes;
