import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/utils/queryProvider";
import NextAuthSession from "@/utils/sessionProvider";
import { UnitStoreProvider } from "@/utils/storeProvider";
import ThemeProvider from "@/utils/themeProvider";
import type { Metadata } from "next";
import { Poppins, Rubik_Moonrocks } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
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
        className={`${rubik_moonrocks.variable} ${poppins.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light "
          enableSystem={true}
        >
          <QueryProvider>
            <NextAuthSession>
              <UnitStoreProvider>{children}</UnitStoreProvider>
            </NextAuthSession>
          </QueryProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
