import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/utils/queryprovider";
import NextAuthSession from "@/utils/sessionprovider";
import ThemeProvider from "@/utils/themeprovider";
import type { Metadata } from "next";
import { Inter, Rubik_Moonrocks } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

const rubik_moonrocks = Rubik_Moonrocks({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rubik-moonrocks",
});

export const metadata: Metadata = {
  title: "Nandi",
  description: "Where you can find me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${rubik_moonrocks.variable} ${inter.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light "
          enableSystem={true}
        >
          <QueryProvider>
            <NextAuthSession>{children}</NextAuthSession>
          </QueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
