import React, { useState } from 'react';
import PropTypes, { object, string } from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';

import AddCommment from './AddComment';

const Comments = ({
  docId, comments: allComents, posted, commentInput
}) => {
  const [comments, setComments] = useState(allComents);

  return (
    <div className="p-4 pt-1">
      {
        comments.length >= 3 && (
          <p className="text-sm text-gray-base mb-1 cursor-pointer">
            {`View all ${comments.length} comments`}
          </p>
        )
      }
      {
        comments.slice(0, 3).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link to={`/p/${item.displayName}`}>
              <span className="mr-1 font-bold">{item.displayName}</span>
              <span>{item.comment}</span>
            </Link>
          </p>
        ))
      }
      <p className="text-xs text-gray-legend uppercase mt-2">
        {
          `${formatDistance(posted, new Date())} ago`
        }
      </p>
      <AddCommment
        docId={docId}
        comments={comments}
        commentInput={commentInput}
        setComments={setComments}
      />
    </div>
  );
};

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.shape({}).isRequired
};

export default Comments;
