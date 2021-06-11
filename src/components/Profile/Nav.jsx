import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

const Nav = () => {
  const { url } = useRouteMatch();
  return (
    <div className="border-t border-gray-primary p-4 mt-8">
      <ul className="flex w-2/5 justify-between mx-auto text-gray-legend uppercase text-sm">
        <li>
          <NavLink
            exact
            to={`${url}`}
            activeClassName="text-gray-base border-t-2 border-gray-base pt-4"
          >
            Posts
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${url}/reels`}
            activeClassName="text-gray-base border-t-2 border-gray-base pt-4"
          >
            Reels
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${url}/channel`}
            activeClassName="text-gray-base border-t-2 border-gray-base pt-4"
          >
            IGTV
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${url}/tagged`}
            activeClassName="text-gray-base border-t-2 border-gray-base pt-4"
          >
            Tagged
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
