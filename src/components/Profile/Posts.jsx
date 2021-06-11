import React from 'react';
import PropTypes from 'prop-types';
import PostPreview from './Post';

const Posts = ({ photos }) => {
  console.log(photos);
  return photos && photos.length > 0
    ? (
      <>
        <div className="grid grid-cols-3 place-items-center gap-7">
          {
            photos.map((photo) => (
              <PostPreview key={photo.docId} photo={photo.imageSrc} />
            ))
          }
        </div>
      </>
    )
    : (
      <div className="flex flex-col justify-center items-center mt-12">
        <div className="rounded-full border border-black-light p-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 text-black-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <p className="font-light text-3xl">No Posts Yet</p>
      </div>
    );
};

Posts.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default Posts;
