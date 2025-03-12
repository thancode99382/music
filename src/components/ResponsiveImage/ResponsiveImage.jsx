import { useState } from "react";
import PropTypes from "prop-types";

function ResponsiveImage({ src, alt, className, placeholder }) {
  const [imgError, setImgError] = useState(false);
  const defaultPlaceholder = "https://via.placeholder.com/200?text=Music";
  
  const handleError = () => {
    setImgError(true);
  };

  return (
    <img
      src={imgError ? (placeholder || defaultPlaceholder) : src}
      alt={alt || "Music"}
      className={`object-cover ${className || ""}`}
      onError={handleError}
      loading="lazy"
    />
  );
}

ResponsiveImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string
};

export default ResponsiveImage;
