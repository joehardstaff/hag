import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCPY-mjD23tdW53ZbqNnv8C0738ta3Q31s",
  authDomain: "rigetzoo.firebaseapp.com",
  databaseURL: "https://rigetzoo-default-rtdb.firebaseio.com",
  projectId: "rigetzoo",
  storageBucket: "rigetzoo.appspot.com",
  messagingSenderId: "844754993545",
  appId: "1:844754993545:web:2e6684bf9ad56c744ca158",
  measurementId: "G-L043WW0ZP6"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {app, db, auth};