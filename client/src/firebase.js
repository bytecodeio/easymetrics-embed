

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfiVBrlA_r_ExEZoC9lTPzZQ0ku-9fZLk",
  authDomain: "sso-react-ca618.firebaseapp.com",
  projectId: "sso-react-ca618",
  storageBucket: "sso-react-ca618.appspot.com",
  messagingSenderId: "171355854865",
  appId: "1:171355854865:web:69e9948820c694ca8739b0",
  measurementId: "G-4ENWH68SHR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
