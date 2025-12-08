// pages/api/data/save.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { dbAdmin } from "../../../lib/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ ok: false, error: "unauthorized" });

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { database } = body || {};
    if (!database) return res.status(400).json({ ok: false, error: "missing database" });

    const ref = dbAdmin.collection("sgb").doc("appData");
    await ref.set(
      {
        database,
        updatedAt: new Date().toISOString(),
        by: (session.user?.email || "").toLowerCase(),
      },
      { merge: true }
    );

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
}
