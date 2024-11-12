// src/lib/auth.ts
import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Static credentials
const VALID_EMAIL = "admin@example.com";
const VALID_PASSWORD = "password";

// Add a static secret key
const NEXTAUTH_SECRET = "your-secret-key-here";

const config: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === VALID_EMAIL &&
          credentials?.password === VALID_PASSWORD
        ) {
          return {
            id: "1",
            name: "Admin User",
            email: VALID_EMAIL,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(config);

export { handler as auth, config as authConfig };
