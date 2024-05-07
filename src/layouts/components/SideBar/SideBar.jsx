import { NavLink } from "react-router-dom";
import routes from "~/config/routes";

const SIDEBAR_ADMIN = [
  {
    title: "Người dùng",
    link: routes.userAdmin,
  },
  {
    title: "Tác giả",
    link: routes.actorAdmin,
  },
  {
    title: "Trang tạp chí",
    link: routes.magazineAdmin,
  },
  {
    title: "Bài báo",
    link: routes.articlesAdmin,
  },
  {
    title: "Thêm bài báo",
    link: routes.addArticleAdmin,
  },
];

function SideBar() {
  let sideBarItem = SIDEBAR_ADMIN;

  return (
    <div className="w-1/6 border-r flex flex-col">
      {sideBarItem.map((data) => (
        <NavLink
          to={data.link}
          className={({ isActive }) =>
            `${
              isActive ? "text-white font-medium bg-primary" : ""
            } px-4 py-3 cursor-pointer hover:bg-primary hover:text-white hover:font-medium`
          }
          key={data.title}
        >
          {data.title}
        </NavLink>
      ))}
    </div>
  );
}

export default SideBar;
