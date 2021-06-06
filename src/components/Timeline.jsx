import React from 'react';
import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/usePhotos';
import Post from './Post';

const Timeline = () => {
  const { photos } = usePhotos();

  return (
    <>
      {
        !photos
          ? (
            <div className="col-span-2">
              <Skeleton count={4} width={640} height={500} className="mb-5" />
            </div>
          )
          : (
            <main className="col-span-2 grid place-items-center">
              {
                photos.length > 0
                  ? (
                    photos.map((content) => (
                      <Post key={content.docId} content={content} />
                    ))
                  )
                  : (
                    <p className="text-center text-2xl">Follow people to see in your feed</p>
                  )
              }
            </main>
          )
      }
    </>
  );
};

export default Timeline;
