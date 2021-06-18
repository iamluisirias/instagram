import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

const PostPreview = ({ photo }) => (
  photo ? (
    <div className="relative group h-96 w-80">
      <img src={photo.imageSrc} alt={photo.caption} className="absolute h-full w-full z-0" />
      <div className="absolute flex items-center h-full w-full text-gray-background bg-black-light bg-opacity-0 hover:bg-opacity-30 opacity-0 hover:opacity-100">
        <div className="flex justify-around w-1/2 mx-auto">
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            <span>{photo.likes.length}</span>
          </div>
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>{photo.comments.length}</span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Skeleton />
  )
);

PostPreview.propTypes = {
  photo: PropTypes.shape({
    imageSrc: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,
    comments: PropTypes.arrayOf(PropTypes.object).isRequired,
    caption: PropTypes.string.isRequired
  }).isRequired
};

export default PostPreview;
