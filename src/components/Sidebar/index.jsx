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
      userId
    }
  } = useUser();

  return (
    <div className="p-4">
      <User fullName={fullName} username={username} />
      <Suggestions userId={userId} />
    </div>
  );
};

export default Sidebar;
