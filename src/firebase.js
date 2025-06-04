// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAe-lQESlhsmP8ckjbEgh6zgqMnz_y-7x8",
  authDomain: "ls-studio-accounts.firebaseapp.com",
  projectId: "ls-studio-accounts",
  storageBucket: "ls-studio-accounts.firebasestorage.app",
  messagingSenderId: "815946937504",
  appId: "1:815946937504:web:5d617c73ce19d03b9b45c5",
  measurementId: "G-22GBQBW9D5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
export const db = getFirestore(app);

export { auth };