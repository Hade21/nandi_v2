import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Credentials, User } from "../../../../../types";
import axios from "axios";
import "../../../../../envConfig";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
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
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
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
