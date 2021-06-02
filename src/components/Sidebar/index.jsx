import React from 'react';
import useUser from '../../hooks/useUser';

// Components
import User from './User';
import Suggestions from './Suggestions';

const Sidebar = () => {
  const {
    user: {
      fullName,
      username,
      userId,
      following
    }
  } = useUser();

  return (
    <div className="p-4 bg-white">
      <User fullName={fullName} username={username} />
      <Suggestions userId={userId} following={following} />
    </div>
  );
};

Sidebar.whyDidYouRender = true;

export default Sidebar;
