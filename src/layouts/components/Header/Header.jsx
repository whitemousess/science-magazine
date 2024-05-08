import { Link, useLocation, useNavigate } from "react-router-dom";
import routes from "~/config/routes";
import { MdBiotech } from "react-icons/md";

import Menu from "./Menu";
import { useContext } from "react";
import { AuthContext } from "~/shared/AuthProvider";
import { IoPersonAddOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";

function Header() {
  const { token, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const MENU_HEADER = [
    {
      title: "Trang chủ",
      link: routes.home,
    },
    {
      title: "Số phát hành",
      link: routes.issueNumber,
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
    <header
      className={`py-4 bg-primary  md:px-10 min-w-full flex md:justify-between justify-center z-50 items-center fixed`}
    >
      <div className="flex ">
        {role !== 0 &&
          MENU_HEADER.map((item) => (
            <div className="relative group" key={item.title}>
              <Link
                to={item.link}
                className={`p-2 hover:underline text-white ${
                  location.pathname === item.link && "underline"
                }`}
              >
                {item.title}
              </Link>

              {item.arrayMenu && (
                <div className="absolute rounded-lg overflow-hidden w-[170px] shadow bg-white hidden group-hover:block">
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
        <>
          <div className="md:block hidden">
            <Link
              to={routes.login}
              className="bg-primary text-white font-medium px-4 py-2 rounded-lg mr-2"
            >
              Đăng nhập
            </Link>
            <Link
              to={routes.register}
              className="border font-medium px-4 py-2 rounded-lg bg-white hover:shadow-inner hover:shadow-black/30"
            >
              Đăng ký
            </Link>
          </div>

          <div className="fixed flex md:hidden bottom-0 z-50 bg-primary w-full">
            <CiLogin
            size={50}
              onClick={() => navigate(routes.login)}
              className="w-1/2 py-3 font-bold text-white hover:bg-blue-600"
            />
            <IoPersonAddOutline
            size={50}
              onClick={() => navigate(routes.register)}
              className="w-1/2 py-3 font-bold text-white hover:bg-blue-600"
            />
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
