import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = ({ user }) => {
  const { username } = user;

  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/p/${username}`} className="flex items-center">
          <img
            className="rounded-full h-8 w-8 flex mr-3"
            src={`/images/avatars/${username}.jpg`}
            alt={`${username} profile`}
          />
          <div>
            <p className="text-sm font-bold">{username}</p>
            <p className="text-sm text-gray-legend">Roma, Italia</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string
  }).isRequired
};

export default Header;
