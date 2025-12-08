// pages/api/data/load.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { dbAdmin } from "../../../lib/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ ok: false, error: "unauthorized" });

  try {
    // caminho único dos dados do app
    const ref = dbAdmin.collection("sgb").doc("appData");
    const snap = await ref.get();

    if (!snap.exists) {
      return res.status(200).json({ ok: true, database: null, exists: false });
    }

    const data = snap.data();
    return res.status(200).json({ ok: true, database: data.database, exists: true, updatedAt: data.updatedAt, by: data.by });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
}
