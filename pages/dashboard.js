// pages/dashboard.js
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.replace("/");
  }, [session, status, router]);

  const iframeSrc = useMemo(() => {
    const email = encodeURIComponent(session?.user?.email || "");
    return `/sgb.html?v=5.0.1&userEmail=${email}`;
  }, [session?.user?.email]);

  if (status === "loading" || !session) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#111827",
          color: "#e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Carregando...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#030712",
        color: "#e5e7eb",
      }}
    >
      {/* Cabeçalho */}
      <header
        style={{
          padding: "16px 24px", // um pouco maior
          backgroundColor: "#111827",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: "#e5e7eb" }}>
            Logado como:{" "}
            <span style={{ fontWeight: 800 }}>
              {session.user?.email || "-"}
            </span>
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {session.user?.image && (
            <img
              src={session.user.image}
              alt="Avatar"
              width={42}
              height={42}
              style={{ borderRadius: "9999px" }}
            />
          )}

          <button
            onClick={() => signOut()}
            style={{
              backgroundColor: "#dc2626",
              border: "none",
              padding: "10px 18px",
              borderRadius: 10,
              color: "#f9fafb",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Sair
          </button>
        </div>
      </header>

      {/* Conteúdo: iframe ocupa tudo que sobrar */}
      <main style={{ flex: 1, minHeight: 0 }}>
        <iframe
          src={iframeSrc}
          title="Sistema de Gestão Brabo"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            display: "block",
          }}
        />
      </main>
    </div>
  );
}
