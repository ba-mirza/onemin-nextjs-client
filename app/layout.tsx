import type { Metadata } from "next"
import { Roboto_Condensed } from "next/font/google"
import "./globals.css"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"

const robotoCondensed = Roboto_Condensed({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "ONEMIN.KZ – Новости Казахстана",
  description: "Свежие новости Казахстана: политика, экономика, спорт, культура.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="kk">
      <body className={`${robotoCondensed.variable} antialiased`}>
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  )
}


