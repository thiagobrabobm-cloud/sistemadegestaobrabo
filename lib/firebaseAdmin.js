// lib/firebaseAdmin.js
import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

// suporta Vercel com \n e também chave colada com quebra real
let privateKey = process.env.FIREBASE_PRIVATE_KEY || "";
privateKey = privateKey.replace(/\\n/g, "\n");

// validações (isso ajuda MUITO a identificar erro de env no Vercel)
if (!projectId || typeof projectId !== "string") {
  throw new Error("FIREBASE_PROJECT_ID ausente no ambiente (Vercel).");
}
if (!clientEmail || typeof clientEmail !== "string") {
  throw new Error("FIREBASE_CLIENT_EMAIL ausente no ambiente (Vercel).");
}
if (!privateKey || typeof privateKey !== "string") {
  throw new Error("FIREBASE_PRIVATE_KEY ausente no ambiente (Vercel).");
}

export const firebaseAdminApp = getApps().length
  ? getApp()
  : initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });

export const dbAdmin = getFirestore(firebaseAdminApp);
export const authAdmin = getAuth(firebaseAdminApp);