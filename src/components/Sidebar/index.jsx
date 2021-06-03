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
      docId,
      following
    }
  } = useUser();

  return (
    <div className="p-4 bg-white">
      <User fullName={fullName} username={username} />
      <Suggestions userId={userId} docId={docId} following={following} />
    </div>
  );
};

Sidebar.whyDidYouRender = true;

export default Sidebar;
