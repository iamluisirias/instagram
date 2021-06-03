import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { updateFollowers, updateFollowing } from '../services/firebase';

const PreviewProfile = ({ profile, authUserId, docIdAuth }) => {
  const {
    fullName, username, docId, userId
  } = profile;

  const [followed, setFollowed] = useState(false);

  const handleFollowUser = async () => {
    try {
      // update the following array of the logged in users
      await updateFollowing(userId, docIdAuth, followed);
      // update the followers array of the user who has been followed
      await updateFollowers(authUserId, docId, followed);
      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1 gap-4 mr-4">
        <img
          src={`/images/avatars/${username}.jpg`}
          alt={username}
          className="rounded-full w-12 h-12"
        />
      </div>
      <div className="col-span-3 flex items-center justify-between">
        <div>
          <p className="font-bold text-sm">{username}</p>
          <p className="text-sm">{fullName}</p>
        </div>
        {
          !followed ? (
            <button
              type="button"
              className="text-sm bg-blue-medium px-3 py-2 rounded text-white"
              onClick={handleFollowUser}
            >
              Follow
            </button>
          ) : (
            <button
              type="button"
              className="text-sm bg-blue-medium opacity-50 px-3 py-2 rounded text-white"
              onClick={handleFollowUser}
            >
              Followed
            </button>
          )
        }
      </div>
    </div>
  );
};

PreviewProfile.propTypes = {
  profile: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired
  }).isRequired,
  authUserId: PropTypes.string.isRequired,
  docIdAuth: PropTypes.string.isRequired
};

export default PreviewProfile;
