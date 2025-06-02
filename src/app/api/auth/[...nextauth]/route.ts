import NextAuth from "next-auth";
import type { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Credentials, User } from "../../../../../types";
import axios from "axios";
import "../../../../../envConfig";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 4 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "string" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as Credentials;
        if (!username && !password) return null;
        try {
          const response = await axios.post(
            `${process.env.DATABASE_URL!}/api/v1/auth/login`,
            {
              username,
              password,
            }
          );
          const user = response.data;
          if (response.status === 200 && user) {
            return user;
          }
          return null;
        } catch (error) {
          console.error("Authentication error: ", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.exp = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.expires = new Date(
        (Math.floor(Date.now() / 1000) + 24 * 60 * 60) * 1000
      ).toISOString();
      session.user = token.user as User;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
