import PropTypes from "prop-types";
import Logo from "~/assets/Logo.png";

function Avatar({ src, className }) {
  return (
    <>
      {src ? (
        <img src={src} alt="avatar" className={className} />
      ) : (
        <img src={Logo} alt="a" className={className} />
      )}
    </>
  );
}

Avatar.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
};

export default Avatar;
