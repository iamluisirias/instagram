import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import { getUserByUsername, getUserPhotosByUsername } from '../../services/firebase';

import Header from './Header';
import Nav from './Nav';
import Posts from './Posts';
import Reels from './Reels';
import Channel from './Channel';
import Tagged from './Tagged';

const UserProfile = ({ username, viewingOwnProfile }) => {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    user: {},
    photosCollection: [],
    followerCount: 0,
    title: 'Instagram'
  };

  const [
    {
      user, photosCollection, followerCount, title
    }, dispatch
  ] = useReducer(reducer, initialState);

  const { path } = useRouteMatch();

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      try {
        const { profile } = await getUserByUsername(username);
        const photos = await getUserPhotosByUsername(username);

        dispatch({
          user: profile[0],
          photosCollection: photos,
          followerCount: profile[0].followers.length,
          title: `${profile[0].fullName} @(${profile[0].username}) - Instagram photos and videos`
        });
      } catch (error) {
        console.log(error);
      }
    }

    getProfileInfoAndPhotos();
    document.title = title;
  }, [username, title]);

  return user && photosCollection ? (
    <>
      <Header
        user={user}
        postsNumber={photosCollection.length}
        followerCount={followerCount}
        viewingOwnProfile={viewingOwnProfile}
      />
      <Nav username={user.username} />

      <Switch>
        <Route path={path} exact>
          <Posts photos={photosCollection} />
        </Route>
        <Route path={`${path}/reels`}>
          <Reels reels={photosCollection} />
        </Route>
        <Route path={`${path}/channel`}>
          <Channel />
        </Route>
        <Route path={`${path}/tagged`}>
          <Tagged />
        </Route>
      </Switch>
    </>
  ) : (
    <Skeleton count={4} className="mt-5" />
  );
};

UserProfile.propTypes = {
  username: PropTypes.string.isRequired,
  viewingOwnProfile: PropTypes.bool.isRequired
};

export default UserProfile;
