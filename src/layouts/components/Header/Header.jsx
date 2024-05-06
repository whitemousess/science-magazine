import { Link, useLocation, useNavigate } from "react-router-dom";
import routes from "~/config/routes";
import { MdBiotech } from "react-icons/md";

import Menu from "./Menu";
import { useContext } from "react";
import { AuthContext } from "~/shared/AuthProvider";

function Header() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const MENU_HEADER = [
    {
      title: "Trang chủ",
      link: () => {
        navigate(routes.home);
      },
    },
    {
      title: "Tổng hợp số phát hành",
      link: () => {
        navigate(routes.home);
      },
    },
    {
      title: "Yêu cầu đăng bài",
      link: () => {
        navigate(token ? routes.newArticle : routes.login);
      },
    },
    {
      title: "Giới thiệu",
      arrayMenu: [
        {
          title: "Giới thiệu tạp chi",
          link: routes.introMagazine,
        },
        {
          title: "Liên hệ",
          link: routes.introContact,
        },
        {
          title: "Bản quyền",
          link: routes.introCopyright,
        },
      ],
    },
  ];

  return (
    <div
      className={`py-4 px-10 min-w-full flex md:justify-between justify-end z-50 items-center bg-white fixed`}
    >
      <div className="flex">
        {MENU_HEADER.map((item) => (
          <div className="relative  group" key={item.title}>
            <button
              onClick={item.link}
              className={`p-2 md:block hidden hover:text-primary`}
            >
              {item.title}
            </button>

            {item.arrayMenu && (
              <div className="absolute w-[170px] shadow bg-white hidden group-hover:block">
                {item.arrayMenu.map((array) => (
                  <button
                    onClick={() => navigate(array.link)}
                    key={array.title}
                    className="px-4 py-2 w-full text-left hover:bg-gray-100 cursor-pointer"
                  >
                    {array.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {token ? (
        <Menu />
      ) : (
        <div>
          <Link
            to={routes.login}
            className="bg-primary text-white font-medium px-4 py-2 rounded-lg mr-2"
          >
            Đăng nhập
          </Link>
          <Link
            to={routes.register}
            className="border font-medium px-4 py-2 rounded-lg "
          >
            Đăng ký
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
