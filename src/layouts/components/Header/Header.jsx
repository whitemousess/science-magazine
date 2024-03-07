import { Link } from "react-router-dom";
import routes from "~/config/routes";
import { FaHome } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

import Menu from "./Menu";
import { useContext } from "react";
import { AuthContext } from "~/shared/AuthProvider";

function Header() {
  const { currentUser, role } = useContext(AuthContext);

  return (
    <div className="py-4 w-full flex justify-around items-center">
      <Link to={routes.home} className="p-2 md:block hidden">
        <FaHome size={30} />
      </Link>

      {role !== 0 && (
        <div className="w-2/3 md:w-1/3 flex items-center border border-primary rounded-xl overflow-hidden">
          <input
            placeholder="Search ..."
            className="w-full pl-4 py-2 outline-none"
          />
          <CiSearch className="cursor-pointer w-10 h-10 p-2" color="#ccc" />
        </div>
      )}

      {currentUser ? (
        <Menu />
      ) : (
        <div>
          <Link
            to={routes.login}
            className="bg-primary text-white font-medium px-4 py-2 rounded-lg mr-2"
          >
            Login
          </Link>
          <Link
            to={routes.register}
            className="border font-medium px-4 py-2 rounded-lg "
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
