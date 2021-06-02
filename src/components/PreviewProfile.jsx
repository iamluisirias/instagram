import React, { useState } from 'react';
import PropTypes, { string } from 'prop-types';

const PreviewProfile = ({ profile }) => {
  const { fullName, username } = profile;

  const [followed, setFollowed] = useState(false);

  const handleFollowUser = async () => {
    setFollowed(true);
  };

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1 gap-4 mr-4">
        <img
          src={`/images/avatars/${username}.jpg`}
          alt={username}
          className="rounded-full"
        />
      </div>
      <div className="col-span-3 flex items-center justify-between">
        <div>
          <p className="font-bold text-sm">{username}</p>
          <p className="text-sm">{fullName}</p>
        </div>
        <button
          type="button"
          className="text-sm bg-blue-medium px-3 py-2 rounded text-white"
        >
          Follow
        </button>
      </div>
    </div>
  );
};

PreviewProfile.propTypes = {
  profile: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    following: PropTypes.arrayOf(string)
  }).isRequired
};

export default PreviewProfile;
