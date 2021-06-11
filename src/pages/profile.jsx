import React, { useEffect, useState } from 'react';
import {
  useParams, useHistory
} from 'react-router-dom';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';

import Header from '../components/Header';
import UserProfile from '../components/Profile';

const Profile = () => {
  // This came from the url we defined for the user's profiles.
  const { username } = useParams();

  const [user, setUser] = useState({});
  const [title, setTitle] = useState('Instagram');

  const history = useHistory();

  const checkUserExists = async () => {
    // Checking if the user exist
    const { exist, profile } = await getUserByUsername(username);

    if (!exist) {
      // No, the username doesn't exist.
      history.push(ROUTES.NOT_FOUND);
      return;
    }
    // Yes, it does
    // The profile response is an array so I do a spreading before I put it in state.
    setUser(...profile);
  };

  useEffect(() => {
    // I created this function to basically wait until is a user in state to change the page title
    const manageInfo = async () => {
      await checkUserExists();
      setTitle(`${user.fullName} (@${user.username}) - Instagram photos and videos`);
    };

    manageInfo();
    document.title = title;
  }, [username, history, title]);

  return user && username && (
    <>
      <Header />
      <div className="bg-gray-background">
        <div className="mx-auto max-w-screen-lg">
          <UserProfile username={username} />
        </div>
      </div>
    </>
  );
};

export default Profile;
