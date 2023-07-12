// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDUXUuYgJPj2mZnbJLVRV_K9XE1KCuG8RE",
  authDomain: "pages2pockets.firebaseapp.com",
  projectId: "pages2pockets",
  storageBucket: "pages2pockets.appspot.com",
  messagingSenderId: "916936571145",
  appId: "1:916936571145:web:74b97bebd391265166bbd8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
