// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCs4rePVqZFInszwAMfVSGIyqilalTQnRE",
  authDomain: "gallery-app-268c9.firebaseapp.com",
  projectId: "gallery-app-268c9",
  storageBucket: "gallery-app-268c9.appspot.com",
  messagingSenderId: "868804152326",
  appId: "1:868804152326:web:c8241af5cb7871447c4787",
  measurementId: "G-T83W4RGXR4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage};