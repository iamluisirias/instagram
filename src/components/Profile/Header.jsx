import React, { useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import PulseLoader from 'react-spinners/PulseLoader';

import UserContext from '../../context/user';
import { getUserByUserId, updateFollowers, updateFollowing } from '../../services/firebase';

import { LOGIN } from '../../constants/routes';

import Numbers from './Numbers';

const Header = ({ user, postsNumber, followerCount }) => {
  // Destructuring the data about that profile in particular.
  const {
    username, fullName, following, followers, docId, userId: profileId
  } = user;

  // Using a reducer
  const initialState = {
    isFollowingProfile: false,
    ownProfile: false,
    verified: true,
    loading: false
  };

  const reducer = (state, newState) => ({ ...state, ...newState });

  const [{
    isFollowingProfile,
    ownProfile,
    verified,
    loading
  }, dispatch] = useReducer(reducer, initialState);

  // Getting the user authenticated
  // This is null when is no user authenticated.
  const {
    user: authUser
  } = useContext(UserContext);

  const history = useHistory();

  // We need the data form the user authenticated.
  const getDataUserAuthenticated = async () => {
    const [result] = await getUserByUserId(authUser.uid);
    return result;
  };

  const handleFollow = async () => {
    if (authUser) {
      const userAuthId = authUser.uid;
      const { docId: docIdAuth } = await getDataUserAuthenticated();

      dispatch({
        loading: true
      });

      try {
        await updateFollowing(profileId, docIdAuth, isFollowingProfile);
        await updateFollowers(userAuthId, docId, isFollowingProfile);

        dispatch({
          isFollowingProfile: !isFollowingProfile,
          loading: false
        });
      } catch (error) {
        console.log(error);
        dispatch({
          loading: false
        });
      }
    } else {
      history.push(LOGIN);
    }
  };

  useEffect(() => {
    const checkingFollower = () => {
      if (authUser) {
        const followingId = authUser.uid;
        if (followers && followers.includes(followingId)) {
          dispatch({
            isFollowingProfile: true
          });
        }
      }
    };

    const viewingOwnProfile = () => {
      if (authUser) {
        const { displayName } = authUser;

        if (displayName === username) {
          dispatch({
            ownProfile: true
          });
        }
      }
    };

    checkingFollower();
    viewingOwnProfile();
  }, [followers]);

  return username ? (
    <header className="grid grid-cols-6 mx-auto max-w-screen-lg">
      <div className="container col-span-2 mx-auto w-3/5">
        <img
          src={`/images/avatars/${username}.jpg`}
          alt={`${username} profile`}
          className="rounded-full w-full"
        />
      </div>
      <section className="col-span-4">
        <div className="flex">
          <div className="flex">
            <h2 className="text-3xl font-light">{username}</h2>
            {
              verified && <img src="/images/verified.png" alt="Instagram verified" className="w-9" />
            }
          </div>
          {
            !ownProfile
              ? (
                <>
                  {
                    isFollowingProfile
                      ? (
                        <>
                          <button
                            type="button"
                            className=" border border-gray-primary rounded text-black-light p-1 px-3 ml-4"
                            onClick={handleFollow}
                          >
                            {
                              !loading
                                ? (
                                  <div className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                )
                                : (
                                  <PulseLoader size={4} color="black" margin={2} />
                                )
                            }
                          </button>
                          <button
                            type="button"
                            className=" border border-gray-primary rounded text-black-light p-1 px-3 ml-1 font-semibold text-sm"
                          >
                            Send Message
                          </button>
                        </>
                      )
                      : (
                        <button
                          type="button"
                          className="bg-blue-medium rounded text-white p-1 px-3 ml-4"
                          onClick={handleFollow}
                        >
                          {
                            !loading ? 'Follow' : <PulseLoader size={4} color="white" margin={2} />
                          }
                        </button>
                      )
                  }
                </>
              ) : (
                <button
                  type="button"
                  className="border rounded border-gray-primary px-3 ml-5 text-black-light text-sm font-semibold"
                >
                  Edit Profile
                </button>
              )
          }
        </div>
        <Numbers posts={postsNumber} followers={followerCount} following={following.length} />
        <p className="font-semibold">{fullName}</p>
        <p className="text-justify">
          Descripción del perfil para comprobar que tanto es el ancho de esta mierda y ver como
          se adapta a la pagina
        </p>
        <p>Link de spam</p>
      </section>
    </header>
  ) : (
    <div className="grid grid-cols-6 mx-auto max-w-screen-lg">
      <div className="col-span-2 mr-12">
        <Skeleton height="12rem" width="12rem" circle="true" className="ml-20" />
      </div>
      <div className=" lg:col-span-3  place-content-between">
        <Skeleton height="2.5rem" className="mb-4" width="50%" />
        <Skeleton height="1.5rem" className="mb-4" width="60%" />
        <Skeleton height="4rem" />
      </div>
    </div>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    followers: PropTypes.arrayOf(PropTypes.string).isRequired,
    following: PropTypes.arrayOf(PropTypes.string).isRequired,
    docId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired
  }).isRequired,
  postsNumber: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired
};

export default Header;
