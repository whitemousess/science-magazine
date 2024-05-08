import PropTypes from "prop-types";
import Pusher from "pusher-js";
import { useContext, useEffect } from "react";

import Footer from "~/layouts/components/Footer";
import Header from "~/layouts/components/Header";
import { AuthContext } from "~/shared/AuthProvider";
import HUNRE_LOGO from '~/assets/HUNRE_Logo.png'

function DefaultLayout({ children }) {
  const { token, role } = useContext(AuthContext);

  useEffect(() => {
    if (token && role !== 0) {
      Notification.requestPermission();
      const pusher = new Pusher(import.meta.env.VITE_KEY_PUSHER, {
        cluster: import.meta.env.VITE_CLUSTER_PUSHER,
      });
      const channel = pusher.subscribe("notification");

      channel.bind("listen-notification", (message) => {
        console.log(message);
        new Notification("Thông báo mới!", {
          body: "Có tạp chí mới được nhà trường xuất bản.",
          icon: HUNRE_LOGO,
        });
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
