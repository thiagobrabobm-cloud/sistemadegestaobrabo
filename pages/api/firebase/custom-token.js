// pages/api/firebase/custom-token.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { authAdmin } from "../../../lib/firebaseAdmin";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  // (opcional) se quiser travar métodos:
  // if (req.method !== "GET") return res.status(405).json({ error: "method_not_allowed" });

  const session = await getServerSession(req, res, authOptions);
  const email = (session?.user?.email || "").toLowerCase().trim();

  if (!email) return res.status(401).json({ error: "unauthenticated" });

  const allowed = new Set(
    (process.env.ALLOWED_EMAILS || "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );

  if (!allowed.has(email)) return res.status(403).json({ error: "forbidden" });

  // Aqui é a diferença: usa authAdmin direto (ao invés de admin.auth())
  const token = await authAdmin.createCustomToken(email, { email });

  return res.status(200).json({ token });
}