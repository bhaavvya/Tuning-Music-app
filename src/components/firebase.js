// Import the functions you need from the SDKs you need
import { getApp,getApps,initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsvVSECi6Mb7wdSZpkDC9zEFohjLafpOU",
  authDomain: "tuning-9ab11.firebaseapp.com",
  databaseURL: "https://tuning-9ab11-default-rtdb.firebaseio.com",
  projectId: "tuning-9ab11",
  storageBucket: "tuning-9ab11.appspot.com",
  messagingSenderId: "430007619912",
  appId: "1:430007619912:web:462d83153a5226b279a37d",
  measurementId: "G-8G3RPHEKFT"
};
// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export default app;
