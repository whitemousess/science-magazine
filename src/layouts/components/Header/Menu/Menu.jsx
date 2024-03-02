import { useContext, useState } from "react";
import { FaBook, FaHeart, FaUserCircle } from "react-icons/fa";

import ListItem from "./ListItem";
import routes from "~/config/routes";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "~/shared/AuthProvider";

function Menu() {
  const navigate = useNavigate();
  const MENU_STUDENT = [
    {
      title: "Trang cá nhân",
      link: () => {
        navigate(routes.profile);
      },
      icon: <FaUserCircle size={18} className="mr-4" />,
    },
    {
      title: "Bài viết yêu thích",
      link: () => {
        navigate(routes.favorites);
      },
      icon: <FaHeart size={18} className="mr-4 text-rose-500" />,
    },
    {
      title: "Bài viết của tôi",
      link: () => {
        navigate(routes.myArticles);
      },
      icon: <FaBook size={18} className="mr-4 text-sky-500" />,
    },
    {
      title: "Đăng xuất",
      link: () => {
        alert("logOut");
      },
      icon: <CiLogout size={18} className="mr-4" />,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const { role } = useContext(AuthContext);

  return (
    <div className="relative">
      {role === 1 ? (
        <FaUserCircle size={32} onClick={() => setIsOpen(!isOpen)} />
      ) : (
        <div className="flex justify-center items-center">
          <Link
            to={routes.homeManager}
            className="bg-primary text-white font-medium px-4 py-2 rounded-lg "
          >
            Dashboard
          </Link>
          <CiLogout
            size={30}
            className="cursor-pointer mx-4"
            onClick={() => alert("logOut")}
          />
        </div>
      )}
      {isOpen && (
        <div className="absolute w-[160px] right-0 border rounded-md bg-white z-10">
          {MENU_STUDENT.map((data) => (
            <ListItem key={data.title} data={data} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
