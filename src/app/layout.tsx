import type { Metadata } from "next";
import { Poppins, Rubik_Moonrocks } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
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
    <html lang="en">
      <body
        className={`${rubik_moonrocks.variable} ${poppins.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
