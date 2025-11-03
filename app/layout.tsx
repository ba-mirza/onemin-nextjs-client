import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getLanguage } from "@/lib/actions/language";
import { LanguageSwitcher } from "@/components/language-switcher";

const robotoCondensed = Roboto_Condensed({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "ONEMIN.KZ – Новости Казахстана",
  description:
    "Свежие новости Казахстана: политика, экономика, спорт, культура.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentLang = await getLanguage();
  return (
    <html lang={currentLang}>
      <body className={`${robotoCondensed.variable} antialiased`}>
        <Header>
          <LanguageSwitcher currentLang={currentLang} />
        </Header>
        <main className="section">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
