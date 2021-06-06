import React, { useRef } from 'react';
import PropTypes, { string } from 'prop-types';

import Header from './Header';
import Interactions from './Interactions';
import Picture from './Picture';
import Footer from './Footer';
import Comments from './Comments';

const Post = ({ content }) => {
  // For a post we need a
  // header, image, actions or interactions (like, comment share, etc), a footer and the comments
  const {
    username,
    imageSrc,
    caption,
    docId,
    userLikedPhoto,
    likes,
    comments,
    dateCreated
  } = content;

  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
      {/* I left it like an object because in the future
       I'll need a reference to the profile picture too. */}
      <Header
        user={{
          username
        }}
      />
      <Picture
        data={{
          imageSrc,
          caption
        }}
      />
      <Interactions
        docId={docId}
        totalLikes={likes.length}
        likedPhoto={userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={caption} username={username} />
      <Comments
        docId={docId}
        comments={comments}
        posted={dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
};

Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    likes: PropTypes.arrayOf(string).isRequired,
    comments: PropTypes.arrayOf(string).isRequired,
    dateCreated: PropTypes.number.isRequired
  }).isRequired
};

export default Post;
