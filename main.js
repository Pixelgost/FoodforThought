// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-eRqGispj_wUHIr55Xeult6POacDFpRs",
  authDomain: "foodforthought-122112.firebaseapp.com",
  projectId: "foodforthought-122112",
  storageBucket: "foodforthought-122112.appspot.com",
  messagingSenderId: "445971372513",
  appId: "1:445971372513:web:64adc1aa0e1c4453f0daa0",
  measurementId: "G-8L26H4EYQ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);