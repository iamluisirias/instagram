import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import PropTypes from 'prop-types';

const User = ({ fullName, username }) => {
  if (!fullName || !username) {
    // Skeleton is basically a component that work like a placeholder while a content is loading.
    return (
      <Skeleton count={1} height={61} />
    );
  }

  return (
    <Link to={`/p/${username}`} className="grid grid-cols-4 gap-4 mb-6 items-center">
      <div className="flex items-center justify-between col-span-1">
        <img src={`/images/avatars/${username}.jpg`} alt={`${username} avatar`} className="rounded-full w-16 h-16 flex mr-3" />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  );
};

// PropTypes validation
User.propTypes = {
  fullName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

export default memo(User);
