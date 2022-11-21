import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7R9Vc8595PEoRWOAXOlwbemseaE1deSA",
  authDomain: "worldcup-bet-ca7ad.firebaseapp.com",
  projectId: "worldcup-bet-ca7ad",
  storageBucket: "worldcup-bet-ca7ad.appspot.com",
  messagingSenderId: "114955377191",
  appId: "1:114955377191:web:0a6cc1a301a36af712cc02",
  measurementId: "G-9CBCL0JVYH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);