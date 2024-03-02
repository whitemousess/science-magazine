import PropTypes from "prop-types";
import SideBar from "../components/SideBar";
import HeaderManager from "./HeaderManager";
function ManagerLayout({ children }) {
  const role = 0;

  if (role > 1) {
    return null;
  }

  return (
    <div>
      <HeaderManager />
      <div className="flex">
        <SideBar />
        {children}
      </div>
    </div>
  );
}

ManagerLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ManagerLayout;
