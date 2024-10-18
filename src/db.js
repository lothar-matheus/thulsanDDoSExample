// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'
import { AuthCredential } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVRU_aefw5SnYuy-9IsbHURm_6MeRIK0c",
  authDomain: "thulsanconuntrytcc.firebaseapp.com",
  projectId: "thulsanconuntrytcc",
  storageBucket: "thulsanconuntrytcc.appspot.com",
  messagingSenderId: "967110026076",
  appId: "1:967110026076:web:b2081c55ae7315a4c15799",
  measurementId: "G-Y0GQLDYJLN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export{app,database }