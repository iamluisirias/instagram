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

const UserProfile = ({ username }) => {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    user: {},
    photosCollection: [],
    followerCount: 0
  };

  const [
    { user, photosCollection, followerCount }, dispatch
  ] = useReducer(reducer, initialState);

  const { path } = useRouteMatch();
  console.log(path);

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const { profile } = await getUserByUsername(username);
      const photos = await getUserPhotosByUsername(username);

      dispatch({
        user: profile[0],
        photosCollection: photos,
        followerCount: profile[0].followers.length
      });
    }

    getProfileInfoAndPhotos();
  }, []);

  return user && photosCollection ? (
    <>
      <Header user={user} postsNumber={photosCollection.length} followerCount={followerCount} />
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
  username: PropTypes.string.isRequired
};

export default UserProfile;
