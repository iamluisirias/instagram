import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ caption, username }) => (
  <div className="p-4 pt-1 pb-0">
    <span className="mr-1 font-bold">{username}</span>
    <span>{caption}</span>
  </div>
);

Footer.propTypes = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

export default Footer;
