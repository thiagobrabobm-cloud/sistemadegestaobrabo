import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Dashboard() {
  // Essa página não renderiza nada
  return null;
}

export async function getServerSideProps(ctx) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    // Se não estiver logado, manda pro login do Google
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${encodeURIComponent("/dashboard")}`,
        permanent: false,
      },
    };
  }

  // Se estiver logado, manda direto para o sistema
  return {
    redirect: {
      destination: "/sgb.html",
      permanent: false,
    },
  };
}
