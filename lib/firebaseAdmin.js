// lib/firebaseAdmin.js
import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

let privateKey = process.env.FIREBASE_PRIVATE_KEY || "";
if (privateKey.includes("\\n")) privateKey = privateKey.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  throw new Error(
    "Faltando envs do Firebase Admin: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY"
  );
}

// Garante 1 única instância (Vercel/Next recarrega módulos às vezes)
export const firebaseAdminApp =
  getApps().length ? getApp() : initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });

export const dbAdmin = getFirestore(firebaseAdminApp);
export const authAdmin = getAuth(firebaseAdminApp);