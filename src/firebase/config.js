// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqF6gfkG7TnAwKGyovcbwzad5DhRUIioo",
  authDomain: "medical-appointment-ef60b.firebaseapp.com",
  projectId: "medical-appointment-ef60b",
  storageBucket: "medical-appointment-ef60b.appspot.com",
  messagingSenderId: "67269565227",
  appId: "1:67269565227:web:bacc82e0473c5b6eef436e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);