// lib/firebaseAdmin.js
import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

let privateKey = process.env.FIREBASE_PRIVATE_KEY || "";
if (privateKey.includes("\\n")) privateKey = privateKey.replace(/\\n/g, "\n");

// Se faltar env no Vercel, vai dar erro (e aparecer no LOG da Function)
if (!projectId || !clientEmail || !privateKey) {
  console.error("[firebaseAdmin] ENV faltando:", {
    FIREBASE_PROJECT_ID: !!projectId,
    FIREBASE_CLIENT_EMAIL: !!clientEmail,
    FIREBASE_PRIVATE_KEY: !!privateKey,
  });
}

// Garante 1 instância do Admin SDK
export const firebaseAdminApp =
  getApps().length
    ? getApp()
    : initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
      });

// Firestore Admin (server)
export const dbAdmin = getFirestore(firebaseAdminApp);

// Auth Admin (server)  ✅ é isso que vamos usar no endpoint
export const authAdmin = getAuth(firebaseAdminApp);