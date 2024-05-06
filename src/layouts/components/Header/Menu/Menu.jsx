import { CiLogout } from "react-icons/ci";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaPencilRuler, FaUserCircle } from "react-icons/fa";

import ListItem from "./ListItem";
import routes from "~/config/routes";
import { AuthContext } from "~/shared/AuthProvider";
import Avatar from "~/components/Avatar";

function Menu() {
  const { logOut, currentUser } = useContext(AuthContext);
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
      title: "Đăng xuất",
      link: logOut,
      icon: <CiLogout size={18} className="mr-4" />,
    },
  ];

  const { role } = useContext(AuthContext);

  return (
    <div className="relative">
      {role === 1 ? (
        <div className="cursor-pointer group">
          <Avatar
            src={currentUser.imageUrl}
            alt="avatar"
            className="w-[50px] h-[50px] rounded-full p-2"
          />
          <div className="absolute hidden group-hover:block w-[170px] right-0 border rounded-md bg-white z-10 select-none group">
            {MENU_STUDENT.map((data) => (
              <ListItem key={data.title} data={data} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Link
            to={routes.userAdmin}
            className="bg-primary text-white font-medium px-4 py-2 rounded-lg "
          >
            Dashboard
          </Link>
          <CiLogout
            size={30}
            className="cursor-pointer mx-4"
            onClick={logOut}
          />
        </div>
      )}
    </div>
  );
}

export default Menu;
