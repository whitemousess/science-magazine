import { useContext } from "react";
import { CiLogout } from "react-icons/ci";
import { MdBiotech } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import routes from "~/config/routes";
import { AuthContext } from "~/shared/AuthProvider";

function HeaderManager() {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="py-4 px-10 flex justify-between  items-center">
      <Link to={routes.home} className="p-2">
        <MdBiotech size={30} />
      </Link>
      <div className="flex items-center">
        <button
          onClick={() =>
            navigate(routes.newActor, { state: { status: "Add" } })
          }
          className="bg-primary text-white px-4 py-2 mr-2 rounded-lg"
        >
          Thêm tác giả
        </button>
        <Link
          to={routes.newMagazine}
          className="bg-primary text-white px-4 py-2 mr-2 rounded-lg"
        >
          Thêm trang tạp chí
        </Link>
        <CiLogout size={30} className="cursor-pointer" onClick={logOut} />
      </div>
    </div>
  );
}

export default HeaderManager;
