import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Se já estiver logado, manda direto para o dashboard
  useEffect(() => {
    if (session) {
      router.replace("/dashboard");
    }
  }, [session]);

  // Carregando sessão
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Carregando...
      </div>
    );
  }

  // Usuário NÃO logado
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Sistema de Gestão Brabo</h1>
        <p className="mb-6 text-gray-300">Faça login para acessar o sistema</p>

        <button
          onClick={() => signIn("google")}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
        >
          Entrar com o Google
        </button>
      </div>
    </div>
  );
}
