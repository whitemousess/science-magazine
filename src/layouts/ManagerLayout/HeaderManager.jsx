import { CiLogout } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import routes from "~/config/routes";

function HeaderManager() {
  return (
    <div className="py-3 px-4 border-b flex justify-between items-center">
      <Link to={routes.home} className="p-2">
        <FaHome size={30} />
      </Link>
      <CiLogout size={30} className="cursor-pointer" />
    </div>
  );
}

export default HeaderManager;
