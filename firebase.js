import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
 apiKey: "AIzaSyAUg_-OfZbAbal8FVqnXAhmGhLVIiLJs8o",
  authDomain: "campus-buddy-d7b44.firebaseapp.com",
  projectId: "campus-buddy-d7b44",
  storageBucket: "campus-buddy-d7b44.firebasestorage.app",
  messagingSenderId: "755786056822",
  appId: "1:755786056822:web:339f72096f6d4a62a8cb57"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);