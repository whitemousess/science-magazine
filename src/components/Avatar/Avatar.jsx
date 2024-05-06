import PropTypes from "prop-types";
import HUNRELOGO from "~/assets/HUNRE_Logo.png";

function Avatar({ src, className }) {
  return (
    <>
      {src ? (
        <img src={src} alt="avatar" className={className} />
      ) : (
        <img src={HUNRELOGO} alt="a" className="w-32 h-32 my-10" />
      )}
    </>
  );
}

Avatar.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
};

export default Avatar;
