import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

const useUser = () => {
  // hook state
  const [activeUser, setActiveUser] = useState({});

  // user from the firebase authentication
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getUserObjByUserId = async () => {
      // We need to get the information in firestore (firebase service)
      // based on our user authenticated.

      // Destructuring the response because i dont need an array.
      const [response] = await getUserByUserId(user.uid);
      setActiveUser(response);
    };

    // if an user is authenticated then get the data from the service firestore from firebase.
    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);

  // we return the data from firestore corresponding to the authenticated user.
  return {
    user: activeUser
  };
};

export default useUser;
