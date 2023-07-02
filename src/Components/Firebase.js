// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3QnaYFlC1LoQ4m7ix77rFXBzfaudz4x4",
  authDomain: "calendar-e8eba.firebaseapp.com",
  projectId: "calendar-e8eba",
  storageBucket: "calendar-e8eba.appspot.com",
  messagingSenderId: "906051622753",
  appId: "1:906051622753:web:bda335c18c77744aa59720",
  measurementId: "G-QFMES9XFVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {firebaseConfig}