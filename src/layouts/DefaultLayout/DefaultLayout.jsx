import PropTypes from "prop-types";
import Footer from "~/layouts/components/Footer";

import Header from "~/layouts/components/Header";

function DefaultLayout({ children }) {
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
