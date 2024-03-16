import { Link } from "react-router-dom";
import routes from "~/config/routes";
import { MdBiotech } from "react-icons/md";

import Menu from "./Menu";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "~/shared/AuthProvider";

function Header() {
  const { token } = useContext(AuthContext);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 500) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }, []);

  return (
    <div
      className={`py-4 px-10 w-full flex justify-between items-center bg-white ${
        scroll && "fixed"
      }`}
    >
      <Link to={routes.home} className="p-2 md:block hidden">
      <MdBiotech size={30} />
      </Link>

      {token ? (
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
