import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  debug: true, // mostra logs úteis
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // só estes 2 e-mails podem entrar
      const allowed = new Set([
        "thiagobrabobm@gmail.com",
        "marlucezanco02@gmail.com"
      ]);
      const email = (user?.email || "").toLowerCase().trim();
      return allowed.has(email);
    },
  },
};

// exporta para o NextAuth
export default NextAuth(authOptions);
