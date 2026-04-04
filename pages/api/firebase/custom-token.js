// pages/api/firebase/custom-token.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { authAdmin } from "../../../lib/firebaseAdmin";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  try {
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

    // ✅ aqui é a troca: authAdmin (e não admin.auth())
    const token = await authAdmin.createCustomToken(email, { email });

    return res.status(200).json({ token });
  } catch (err) {
    console.error("[custom-token] error:", err);
    return res.status(500).json({ error: "internal_error" });
  }
}