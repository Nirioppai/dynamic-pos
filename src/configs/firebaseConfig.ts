// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDhfqjJkhha-sbODk5Ae_2fdSkQUSO_7lI',
  authDomain: 'fir-auth-practice-january.firebaseapp.com',
  projectId: 'fir-auth-practice-january',
  storageBucket: 'fir-auth-practice-january.appspot.com',
  messagingSenderId: '36387135351',
  appId: '1:36387135351:web:5f53fe4d6dd81c04abcb72',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
