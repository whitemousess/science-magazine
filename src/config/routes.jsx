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
  issueNumber: "/list-magazine",
  detailMagazine: "/magazine/:id",

  introMagazine: "/intro/magazine",
  introContact: "/intro/contact",
  introCopyright: "/intro/Copyright",

  login: "/login",
  register: "/register",

  userAdmin: "/manager/home",
  actorAdmin: "/manager/actor",
  newActor: "/manager/new-actor",
  editUser: "/manager/user-edit/:id",
  articlesAdmin: "/manager/admin/articles",
  newMagazine: "/manager/admin/add-magazine",
  magazineAdmin: "/manager/admin/magazine",
  addArticleAdmin: "/manager/admin/add-article",
};

export default routes;
