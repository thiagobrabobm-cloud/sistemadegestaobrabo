// lib/firebaseAdmin.js
import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let privateKey = process.env.FIREBASE_PRIVATE_KEY || "";

// No Vercel geralmente fica com "\n" no texto
privateKey = privateKey.replace(/\\n/g, "\n");

// Falha clara se faltar env (isso evita 500 “misterioso”)
if (!projectId || !clientEmail || !privateKey) {
  throw new Error(
    "Faltando env do Firebase Admin: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY"
  );
}

export const firebaseAdminApp =
  getApps().length
    ? getApp()
    : initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
      });

export const dbAdmin = getFirestore(firebaseAdminApp);
export const authAdmin = getAuth(firebaseAdminApp);