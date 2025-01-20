// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration object (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyCpZaSdDKe8GCsVZNHzoKq1kyaRYzdRB9Y",
  authDomain: "clockify-90646.firebaseapp.com",
  projectId: "clockify-90646",
  storageBucket: "clockify-90646.firebasestorage.app",
  messagingSenderId: "315224623441",
  appId: "1:315224623441:web:73c39fcb7669302e522b70",
  measurementId: "G-YG4M5MMQRL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore instance
export const db = getFirestore(app);

// Auth instance
export const auth = getAuth(app);

export default app;
