import { firebase, FieldValue } from '../lib/firebase';

// Services
const db = firebase.firestore();
// const fv = app.firestore.FieldValue;

// Function to check if an username is already taken
export async function doesUsernameExist(username) {
  const result = await db
    .collection('users')
    .where('username', '==', username)
    .get();

  // return an array when all the coincides of that username in boolean values.
  // ideally i'll be just one, but in case there exist more than one, I do a mapping
  // for all the boolean values
  return result.docs.map((user) => user.exists);
}

// Function to get the data form firestore of an user authenticated.
export async function getUserByUserId(id) {
  const result = await db
    .collection('users')
    .where('userId', '==', id)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
  return user;
}

// Function to get profiles for suggestion to the user.
export async function getSuggestedProfiles(id, following) {
  const result = await db
    .collection('users')
    .limit(10)
    .get();

  return result.docs
    .map((doc) => ({
      ...doc.data(), docId: doc.id
    }))
    .filter((profile) => profile.userId !== id && !following.includes(profile.userId));
}
// Function to update followers array of the authenticated user
export async function updateFollowers(authUserId, docId, isUserFollower) {
  // Se necesita actualizar el arreglo de seguidores del usuario al que se le dio follow.
  await db
    .collection('users')
    .doc(docId)
    .update({
      followers: isUserFollower
        ? FieldValue.arrayRemove(authUserId)
        : FieldValue.arrayUnion(authUserId)
    });
}

// Function to update following array of the authenticated user
export async function updateFollowing(userFollowedId, docIdAuth, isFollowingProfile) {
  // Se necesita actualizar el arreglo de siguiendo del usuario autenticado que dio follow.
  await db
    .collection('users')
    .doc(docIdAuth)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(userFollowedId)
        : FieldValue.arrayUnion(userFollowedId)
    });
}

// Function to get the photos from the people that the auth user is following
export async function getPhotos(userId, following) {
  const result = await db
    .collection('photos')
    .where('userId', 'in', following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;

      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }

      // We extract te information of the user who post this partcular photo.
      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];
      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
}

export async function getUserByUsername(username) {
  const result = await db
    .collection('users')
    .where('username', '==', username)
    .get();

  const profile = result.docs.map((user) => ({
    ...user.data(),
    docId: user.id
  }));

  if (profile.length === 0) {
    return {
      exist: false
    };
  }

  return {
    exist: true,
    profile
  };
}

export async function getUserPhotosByUsername(username) {
  const { profile } = await getUserByUsername(username);
  const id = profile[0].userId;

  const result = await db
    .collection('photos')
    .where('userId', '==', id)
    .get();

  return result.docs.map((photos) => ({
    ...photos.data()
  }));
}
