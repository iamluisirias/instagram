import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';

const Numbers = ({ posts, followers, following = 0 }) => {
  const { url } = useRouteMatch();

  return (
    <div className="flex justify-between my-5 w-1/2">
      <p>
        <span className="font-bold">
          {
            posts
          }
        </span>
        {' '}
        post
      </p>
      <Link to={`${url}/followers`}>
        <p>
          <span className="font-bold">
            {
              followers
            }
          </span>
          {' '}
          followers
        </p>
      </Link>
      <Link to={`${url}/following`}>
        <p>
          <span className="font-bold">
            {
              following
            }
          </span>
          {' '}
          following
        </p>
      </Link>
    </div>
  );
};

Numbers.propTypes = {
  posts: PropTypes.number.isRequired,
  followers: PropTypes.number.isRequired,
  following: PropTypes.number.isRequired
};

export default Numbers;
