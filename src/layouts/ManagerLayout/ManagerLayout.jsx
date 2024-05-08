import PropTypes from "prop-types";
import { useContext } from "react";

import SideBar from "../components/SideBar";
import HeaderManager from "./HeaderManager";
import { AuthContext } from "~/shared/AuthProvider";

function ManagerLayout({ children }) {
  const { role } = useContext(AuthContext);

  if (role !== 0) {
    return null;
  }

  return (
    <div>
      <HeaderManager />
      <div className="flex">
        <SideBar />
        <div className=" w-5/6">{children}</div>
      </div>
    </div>
  );
}

ManagerLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ManagerLayout;
