import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        if (credentials.email !== process.env.ADMIN_EMAIL) return null;

        const hashB64 = process.env.ADMIN_PASSWORD_HASH;
        if (!hashB64) return null;
        const hash = Buffer.from(hashB64.trim(), "base64").toString("utf8");

        const valid = await bcrypt.compare(
          credentials.password as string,
          hash
        );
        if (!valid) return null;

        return { id: "admin", email: credentials.email as string, name: "Admin" };
      },
    }),
  ],
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
});
