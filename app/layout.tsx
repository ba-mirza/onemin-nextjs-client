import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/react";

const robotoCondensed = Roboto_Condensed({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "ONEMIN.KZ – Қазақстан жаңалықтары",
  description:
    "Oneminute.kz — Қазақстан мен шетелдегі маңызды оқиғалардан жедел түрде хабар тарататын сайт",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kz">
      <body className={`${robotoCondensed.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
