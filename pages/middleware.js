// middleware.js
export { default } from "next-auth/middleware";

// Define quais rotas devem exigir login
export const config = {
  matcher: ["/sgb.html", "/dashboard"],
};
