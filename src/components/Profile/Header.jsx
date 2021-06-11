import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

import UserContext from '../../context/user';

const Header = ({ user, postsNumber, followerCount }) => {
  const {
    username, fullName, following, followers
  } = user;

  // State for checking is the authenticated user is following the profile on screen.
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);

  const verified = true;

  const {
    user: {
      uid: userId
    }
  } = useContext(UserContext);

  useEffect(() => {
    if (followers && followers.includes(userId)) {
      setIsFollowingProfile(true);
    }
  }, [followers]);

  return username ? (
    <header className="grid grid-cols-6">
      <div className="col-span-2 mx-auto w-3/5">
        <img
          src={`/images/avatars/${username}.jpg`}
          alt={`${username} profile`}
          className="rounded-full mx-auto w-full"
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
            isFollowingProfile
              ? (
                <button
                  type="button"
                  className=" border border-gray-primary rounded text-black-light p-1 px-3 ml-4"
                >
                  <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </button>
              )
              : (
                <button
                  type="button"
                  className="bg-blue-medium rounded text-white p-1 px-3 ml-4"
                >
                  Follow
                </button>
              )
          }
        </div>
        <div className="flex justify-between my-5 w-1/2">
          <p>
            <span className="font-bold">
              {
                postsNumber
              }
            </span>
            {' '}
            post
          </p>
          <p>
            <span className="font-bold">
              {
                followerCount
              }
            </span>
            {' '}
            followers
          </p>
          <p>
            <span className="font-bold">
              {
                following
                  ? following.length
                  : 0
              }
            </span>
            {' '}
            following
          </p>
        </div>
        <p className="font-semibold">{fullName}</p>
        <p className="text-justify">
          Descripcion del perfil para comprobar que tanto es el ancho de esta mierda y ver como
          se adapta a la pagina
        </p>
        <p>Link de spam</p>
      </section>
    </header>
  ) : (
    <div className="w-full grid grid-cols-2 h-48">
      <Skeleton
        circle="true"
        height="100%"
        width="40%"
      />
      <Skeleton
        height="100%"
      />
    </div>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    followers: PropTypes.arrayOf(PropTypes.string).isRequired,
    following: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  postsNumber: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired
};

export default Header;
