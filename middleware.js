// middleware.js
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Este middleware roda em TODAS as rotas (ver config no final).
// 1) Se o host NÃO for produção nem localhost, redireciona para o domínio oficial.
// 2) Protege apenas as rotas que a gente marcar como "protegidas".

export default withAuth(
  function middleware(req) {
    const host = req.headers.get("host") ?? "";

    const isProd = host === "sistemadegestaobrabo.vercel.app";
    const isLocal =
      host.startsWith("localhost:3000") || host.startsWith("127.0.0.1");

    // Redireciona qualquer domínio de preview para o domínio oficial
    if (!isProd && !isLocal) {
      const url = req.nextUrl.clone();
      url.protocol = "https";
      url.hostname = "sistemadegestaobrabo.vercel.app";
      url.port = "";
      return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
  },
  {
    // Aqui dizemos QUANDO exigir login.
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Liste aqui as rotas protegidas:
        const protectedPaths = ["/dashboard", "/sgb.html"];

        const isProtected = protectedPaths.some(
          (p) => pathname === p || pathname.startsWith(`${p}/`)
        );

        // Se não é protegida, libera sem exigir token
        if (!isProtected) return true;

        // Se é protegida, exige token
        return !!token;
      },
    },
  }
);

// Rodar em (quase) todas as rotas, inclusive /api/auth/*.
// Exclui apenas assets estáticos.
export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/sgb.html", "/api/data/:path*"],
};

