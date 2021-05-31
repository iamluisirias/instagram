import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';

const useAuth = () => {
  const initialState = JSON.parse(localStorage.getItem('authUser'));

  const [user, setUser] = useState(initialState);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      // If we have a authUser, therefore we can store the user in localStorage.
      if (authUser) {
        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUser(authUser);
      } else {
        // We don't have an authUSer, therefore clear the localStorage.
        localStorage.removeItem('authUser');
      }
    });

    return () => listener();
  }, [firebase]);

  return {
    user
  };
};

export default useAuth;
