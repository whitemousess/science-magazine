import PropTypes from "prop-types";
import Pusher from "pusher-js";
import { useContext, useEffect } from "react";

import Footer from "~/layouts/components/Footer";
import Header from "~/layouts/components/Header";
import { AuthContext } from "~/shared/AuthProvider";
import Logo from "~/assets/Logo.png";
import { useNavigate } from "react-router-dom";
import routes from "~/config/routes";

function DefaultLayout({ children }) {
  const { token, role } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && role !== 0) {
      Notification.requestPermission();
      const pusher = new Pusher(import.meta.env.VITE_KEY_PUSHER, {
        cluster: import.meta.env.VITE_CLUSTER_PUSHER,
      });
      const channel = pusher.subscribe("notification");

      channel.bind("listen-notification", (message) => {
        const notification = new Notification("Thông báo mới!", {
          body: "Có tạp chí mới được nhà trường xuất bản.",
          icon: Logo,
        });
        notification.onclick = function (event) {
          event.preventDefault(); // Prevents the browser from focusing the Notification's related tab
          navigate(routes.issueNumber); // Opens a new tab with the specified URL
        };
      });
      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
    }
  }, [token, role]);

  return (
    <div>
      <Header />
      <div className="pt-[100px] flex justify-center">
        <div className="container shadow-2xl rounded-lg">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
