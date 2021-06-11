/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default function IsUserLoggedIn({
  user, loggedInPath, children, ...rest
}) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user) {
          return children;
        }

        if (user) {
          return (
            <Redirect
              to={{
                pathname: loggedInPath,
                state: { from: location }
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}

IsUserLoggedIn.propTypes = {
  user: PropTypes.shape({}).isRequired,
  loggedInPath: PropTypes.string.isRequired,
  children: PropTypes.shape({}).isRequired
};
