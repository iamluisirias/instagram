import React from 'react';
import PropTypes from 'prop-types';

const Picture = ({ data }) => {
  const { imageSrc, caption } = data;
  return (
    <>
      <img src={imageSrc} alt={caption} />
    </>
  );
};

Picture.propTypes = {
  data: PropTypes.shape({
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired
  }).isRequired
};

export default Picture;
