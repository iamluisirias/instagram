import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getUserByUserId, getPhotos } from '../services/firebase';

const usePhotos = () => {
  const [photos, setPhotos] = useState(null);

  // Destucturing the authenticated data
  // user uid as userId with a default of ''.
  const {
    user: {
      uid: userId = ''
    }
  } = useContext(UserContext);

  useEffect(() => {
    const getTimelinePhotos = async () => {
      try {
        // First we need to know what users is the authUser following.
        const [user] = await getUserByUserId(userId);
        const { following } = user;

        // then we need to get the photos from those users
        if (following.length > 0) {
          // If the user is actually following people then get those people photos.
          const response = await getPhotos(userId, following);
          setPhotos(
            response.sort((a, b) => b.dateCreated - a.dateCreated)
          );
          return;
        }

        setPhotos([]);
      } catch (error) {
        console.log(error);
      }
    };

    if (userId) {
      // Only if a user is authenticated run this function.
      getTimelinePhotos();
    }
  }, []);

  return {
    photos
  };
};

export default usePhotos;
