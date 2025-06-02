"use client";

import { SessionProvider } from "next-auth/react";

const NextAuthSession = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthSession;
