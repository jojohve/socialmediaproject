// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyB2IL4MUq_HyY519rbzQuf0roA1z5GGl7M",

  authDomain: "social-media-project-18b22.firebaseapp.com",

  projectId: "social-media-project-18b22",

  storageBucket: "social-media-project-18b22.firebasestorage.app",

  messagingSenderId: "105134889215",

  appId: "1:105134889215:web:1fb393fbbd5079555554ca"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);