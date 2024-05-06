import PropTypes from "prop-types";
import Footer from "~/layouts/components/Footer";

import Header from "~/layouts/components/Header";

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="pt-[82px]">{children}</div>
      <Footer />
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
