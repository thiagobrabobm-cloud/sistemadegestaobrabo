// lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIZaSyBEId876arIljEKYUz7ejnhLcstnsHY7Y",
  authDomain: "sistemadegestaobrabo.firebaseapp.com",
  projectId: "sistemadegestaobrabo",
  storageBucket: "sistemadegestaobrabo.firebasestorage.app",
  messagingSenderId: "1050063988219",
  appId: "1:1050063988219:web:d5a4b3d13051448406575e",
};

// Garante 1 única instância
export const firebaseApp =
  getApps().length ? getApp() : initializeApp(firebaseConfig);

// Exports que usaremos no app
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
