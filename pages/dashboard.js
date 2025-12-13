// pages/dashboard.js
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Se não tiver sessão, manda de volta para a tela de login (/)
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.replace("/");
    }
  }, [session, status, router]);

  // Monta a URL do iframe já com o e-mail do NextAuth
  const iframeSrc = useMemo(() => {
    const email = encodeURIComponent(session?.user?.email || "");
    // v=... ajuda a “forçar” atualizar quando a Vercel/browser estiver cacheando
    return `/sgb.html?v=5.0.1&userEmail=${email}`;
  }, [session?.user?.email]);

  // Enquanto carrega a sessão ou redireciona
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

  // Usuário logado -> mostra cabeçalho + iframe com o sistema sgb.html
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#030712",
        color: "#e5e7eb",
      }}
    >
      {/* Cabeçalho */}
      <header
        style={{
          padding: "12px 20px",
          backgroundColor: "#111827",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
        }}
      >
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700 }}>
            Sistema de Gestão Brabo v5.0
          </h1>
          <p style={{ marginTop: 4, fontSize: 14, color: "#9ca3af" }}>
            Logado como: {session.user?.email}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {session.user?.image && (
            <img
              src={session.user.image}
              alt="Avatar"
              width={40}
              height={40}
              style={{ borderRadius: "9999px" }}
            />
          )}

          <button
            onClick={() => signOut()}
            style={{
              backgroundColor: "#dc2626",
              border: "none",
              padding: "8px 16px",
              borderRadius: 8,
              color: "#f9fafb",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Sair
          </button>
        </div>
      </header>

      {/* Conteúdo: o seu sistema v5.0 em sgb.html */}
      <main style={{ flex: 1 }}>
        <iframe
          src={iframeSrc}
          title="Sistema de Gestão Brabo"
          style={{
            width: "100%",
            height: "calc(100vh - 60px)", // 60px ~ altura do header
            border: "none",
          }}
        />
      </main>
    </div>
  );
}
