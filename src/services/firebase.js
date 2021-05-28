import { firebase, FieldValue } from '../lib/firebase';

export default async function doesUsernameExist(username) {
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
