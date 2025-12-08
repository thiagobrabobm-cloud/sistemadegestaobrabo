// pages/api/admin/ping.js
import { dbAdmin } from "../../../lib/firebaseAdmin";

export default async function handler(req, res) {
  try {
    // grava/atualiza um doc "diagnostics/ping" com timestamp
    const ref = dbAdmin.collection("diagnostics").doc("ping");
    await ref.set({ at: new Date().toISOString() }, { merge: true });

    // lê de volta para confirmar
    const snap = await ref.get();
    return res.status(200).json({
      ok: true,
      wrote: snap.exists,
      data: snap.data(),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: String(err) });
  }
}
