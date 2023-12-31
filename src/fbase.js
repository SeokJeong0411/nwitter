import { initializeApp } from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import * as firebaseDB from "firebase/firestore";
import * as firebaseStorage from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

initializeApp(firebaseConfig);

export const authService = firebaseAuth;
export const dbService = firebaseDB;
export const storageService = firebaseStorage;
