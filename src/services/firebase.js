import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  // return an array when all the coincides of that username in boolean values.
  // ideally i'll be just one, but in case there exist more than one, I do a mapping
  // for all the boolean values
  return result.docs.map((user) => user.exists);
}

export async function getUserByUserId(id) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', id)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));
  return user;
}

export async function getSuggestedProfiles(id, following) {
  const result = await firebase
    .firestore()
    .collection('users')
    .limit(10)
    .get();

  return result.docs
    .map((doc) => ({
      ...doc.data(), docId: doc.id
    }))
    .filter((profile) => profile.userId !== id && !following.includes(profile.userId));
}
