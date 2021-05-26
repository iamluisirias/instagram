import Firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Se importa el archivo seed.js
import seedDatabase from '../seed';

const config = {};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = firebase.firestore;

// Aquí es donde se llamará al archivo seed.js ( Solo una vez )
// seedDatabase(firebase)

export { firebase, FieldValue };
