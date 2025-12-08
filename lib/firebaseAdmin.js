// lib/firebaseAdmin.js
import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

let privateKey = process.env.FIREBASE_PRIVATE_KEY || "";
if (privateKey.includes("\\n")) privateKey = privateKey.replace(/\\n/g, "\n");

export const firebaseAdminApp =
  getApps().length ? getApp() : initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });

export const dbAdmin = getFirestore(firebaseAdminApp);
