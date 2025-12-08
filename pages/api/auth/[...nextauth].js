// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // use NEXTAUTH_SECRET (ou AUTH_SECRET como fallback se você realmente usa isso)
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  debug: true, // deixe true só enquanto estiver testando

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      // Lê e-mails permitidos do .env: ALLOWED_EMAILS=um@a.com, outro@b.com
      const allowed = new Set(
        (process.env.ALLOWED_EMAILS || "")
          .split(",")
          .map((s) => s.trim().toLowerCase())
          .filter(Boolean)
      );

      // Se a lista estiver vazia, por segurança NÃO deixa entrar
      if (allowed.size === 0) return false;

      const email = (user?.email || "").toLowerCase().trim();
      return allowed.has(email);
    },
  },
};

// 👉 ESSA LINHA NÃO PODE FALTAR
export default NextAuth(authOptions);
