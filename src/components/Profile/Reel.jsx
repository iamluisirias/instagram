import React from 'react';
import PropTypes from 'prop-types';

const ReelPreview = ({ reel }) => (
  <div className="h-96 bg-black-light">
    <img src={reel} alt="" />
  </div>
);

ReelPreview.propTypes = {
  reel: PropTypes.string.isRequired
};

export default ReelPreview;
