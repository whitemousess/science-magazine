import { useContext } from "react";
import { CiLogout } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import routes from "~/config/routes";
import { AuthContext } from "~/shared/AuthProvider";

function HeaderManager() {
  const { logOut } = useContext(AuthContext);

  return (
    <div className="py-3 px-4 border-b flex justify-between items-center">
      <Link to={routes.home} className="p-2">
        <FaHome size={30} />
      </Link>
      <CiLogout size={30} className="cursor-pointer" onClick={logOut} />
    </div>
  );
}

export default HeaderManager;
