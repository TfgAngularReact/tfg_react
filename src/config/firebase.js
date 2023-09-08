import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyBey7Vd7yadZHRTk68cjQCgf-6KN8kdLWI",
  authDomain: "tfg-angular-28832.firebaseapp.com",
  projectId: "tfg-angular-28832",
  storageBucket: "tfg-angular-28832.appspot.com",
  messagingSenderId: "431230168573",
  appId: "1:431230168573:web:5aa242416380cd5e3a3d94",
  measurementId: "G-48DK0V3YCX"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);
export const auth = getAuth(appFirebase);
export const db = getFirestore(appFirebase);