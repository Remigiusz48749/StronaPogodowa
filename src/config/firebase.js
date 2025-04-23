// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvaMcaH5Rkp_5TEAkJO9n4zV6spYnG9RM",
  authDomain: "backend-in-firebase-rk.firebaseapp.com",
  projectId: "backend-in-firebase-rk",
  storageBucket: "backend-in-firebase-rk.firebasestorage.app",
  messagingSenderId: "989136204678",
  appId: "1:989136204678:web:071c005aa13025dceeb207",
  measurementId: "G-V3XVS9E8BD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider(); 

export const db = getFirestore(app)