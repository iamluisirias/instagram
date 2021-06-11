import React from 'react';
import PropTypes from 'prop-types';

const PostPreview = ({ photo }) => {
  const hola = 'hola';

  return (
    <div className="hover:bg-black-light">
      <img src={photo} alt="Post" className="h-96 w-80 hover:opacity-50" />
    </div>
  );
};

PostPreview.propTypes = {
  photo: PropTypes.string.isRequired
};

export default PostPreview;
