import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import PropTypes, { string } from 'prop-types';
import { getSuggestedProfiles } from '../../services/firebase';
import PreviewProfile from '../PreviewProfile';

const Suggestions = ({ userId, following }) => {
  const [profiles, setProfiles] = useState(null);

  // Function to get profiles for suggest to the user
  const getSuggestions = async () => {
    try {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      getSuggestions();
    }
  }, [userId]);

  // Go ahead and get the suggested profiles
  // We need to use a firebase service.
  // Within useEffect we need to call that function.
  // Then, we stored it in state.
  // Go ahead and render (waiting on the profile as an skeleton)
  return (
    <div>
      {
        !profiles ? (
          <Skeleton count={1} height={200} className="mt-5" />
        ) : (
          <ul className="mt-10">
            <p className="font-bold text-gray-base mb-3">Suggestions for you</p>
            {
              profiles.map((profile) => (
                <li key={profile.userId} className="mb-4 last:mb-2">
                  <PreviewProfile profile={profile} />
                </li>
              ))
            }
          </ul>
        )
      }
    </div>
  );
};

Suggestions.propTypes = {
  userId: PropTypes.string.isRequired,
  following: PropTypes.arrayOf(string).isRequired
};

export default Suggestions;
