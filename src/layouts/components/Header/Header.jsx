import { Link, useLocation, useNavigate } from "react-router-dom";
import routes from "~/config/routes";
import { IoPersonAddOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { useContext } from "react";

import Menu from "./Menu";
import { AuthContext } from "~/shared/AuthProvider";
import QRApp from "~/assets/QRApp.png";
import { FaAppStoreIos, FaGooglePlay } from "react-icons/fa";

function Header() {
  const location = useLocation();
  const { token, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const driveLink =
    "https://drive.google.com/file/d/1Am_xpqDH4hdpyCKWlLiFiBvePy6ikO-t/view?usp=drive_link";

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

  const handleClick = () => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isAndroid || isIOS) {
      window.location.href = `https://drive.google.com/file/d/1Am_xpqDH4hdpyCKWlLiFiBvePy6ikO-t/view?usp=drive_link`;
    } else {
      window.open(driveLink, "_blank");
    }
  };

  return (
    <header
      className={`py-4 bg-primary  md:px-10 min-w-full flex md:justify-between justify-center z-50 items-center fixed`}
    >
      <div className="flex ">
        {role !== 0 && (
          <>
            {MENU_HEADER.map((item) => (
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

            <div className="group relative">
              <button className="px-2 hover:underline text-white">
                Tải ứng dụng
              </button>

              <div className="hidden group-hover:block bg-white absolute right-0 p-6  rounded-lg shadow-xl">
                <div className="w-[320px] flex flex-col items-center">
                  <img
                    src={QRApp}
                    className="w-[200px] h-[200px] object-cover"
                  />
                </div>

                <div className="flex justify-evenly mt-4">
                  <button className="flex justify-center items-center pr-4 border-r">
                    <FaAppStoreIos className="mr-1" size={32} />
                    Coming soon
                  </button>
                  <button
                    onClick={handleClick}
                    className="flex justify-center items-center"
                  >
                    <FaGooglePlay className="mr-1" size={32} /> Download file
                    APK
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
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
