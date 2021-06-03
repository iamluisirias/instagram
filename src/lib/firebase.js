import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDZ_OuB197JvIgwhtkJ35UPMMWsaA_qvHs',
  authDomain: 'instagram-fb215.firebaseapp.com',
  projectId: 'instagram-fb215',
  storageBucket: 'instagram-fb215.appspot.com',
  messagingSenderId: '532211477273',
  appId: '1:532211477273:web:d3e2fc45601eeaacb0b388'
};

const firebase = app.initializeApp(firebaseConfig);
const { FieldValue } = app.firestore;

export { firebase, FieldValue };
