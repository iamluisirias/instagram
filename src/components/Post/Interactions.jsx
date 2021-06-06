import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

const Interactions = ({
  docId, totalLikes, likedPhoto, handleFocus
}) => {
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: {
      uid: userId = ''
    }
  } = useContext(UserContext);

  const db = firebase.firestore();

  const [toggleLiked, setToggleLiked] = useState(likedPhoto);
  const [likes, setLikes] = useState(totalLikes);

  const handleToggleLiked = async () => {
    await db.collection('photos').doc(docId).update({
      likes: toggleLiked
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId)
    });

    setLikes(
      toggleLiked ? likes - 1 : likes + 1
    );
    setToggleLiked(!toggleLiked);
  };

  return (
    <>
      <div className="flex justify-between px-4 py-2">
        <div className="flex">
          <svg
            onClick={handleToggleLiked}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleToggleLiked();
              }
            }}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-8 w-8 mr-4 select-none cursor-pointer ${toggleLiked ? 'fill-red text-red-primary' : 'text-black-light'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>

          <svg
            onClick={handleFocus}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleFocus();
              }
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-black-light select-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
      </div>

      <div className="px-4 py-0">
        <p className="font-bold">
          {
            totalLikes === 1 ? `${likes} like` : `${likes} likes`
          }
        </p>
      </div>
    </>
  );
};

Interactions.propTypes = {
  docId: PropTypes.string.isRequired,
  totalLikes: PropTypes.number.isRequired,
  likedPhoto: PropTypes.bool.isRequired,
  handleFocus: PropTypes.func.isRequired
};

export default Interactions;
