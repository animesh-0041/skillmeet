import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCsGAP_OlbYv0RgFLsOVKgqC9whia3T6FU",
  authDomain: "stackoverflow-auth-298a3.firebaseapp.com",
  projectId: "stackoverflow-auth-298a3",
  storageBucket: "stackoverflow-auth-298a3.appspot.com",
  messagingSenderId: "880005866718",
  appId: "1:880005866718:web:e26b2d0b4fd6ce94854e4f",
  measurementId: "G-6HQZDM6PE3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();
