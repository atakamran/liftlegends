// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgL8h6R10Xf4xGtSDTVqgoqF_R6MndL7Y",
  authDomain: "lift-legends-app.firebaseapp.com",
  projectId: "lift-legends-app",
  storageBucket: "lift-legends-app.firebasestorage.app",
  messagingSenderId: "424171382414",
  appId: "1:424171382414:web:240af6a8856362619a8bdf",
  measurementId: "G-XFPT47SKLW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);