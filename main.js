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
import { firebase } from "googleapis/build/src/apis/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider, RecaptchaVerifier } from "firebase/auth";
const provider = new GoogleAuthProvider();
const auth = getAuth();
const react = require('react');
auth.languageCode = 'it';
firebase.auth().useDeviceLanguage();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

