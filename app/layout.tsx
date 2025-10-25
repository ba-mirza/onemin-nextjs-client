import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const robotoCondensed = Roboto_Condensed({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "ONEMIN.KZ – Новости Казахстана",
  description:
    "Свежие новости Казахстана: политика, экономика, спорт, культура.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kk">
      <body className={`${robotoCondensed.variable} antialiased`}>
        <Header />
        <main className="section">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
