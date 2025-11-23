import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageSwitcher } from "@/components/language-switcher";

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: "ru" | "kz" }>;
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;

  return (
    <>
      <Header>
        <LanguageSwitcher currentLang={lang} />
      </Header>
      <main className="section">{children}</main>
      <Footer />
    </>
  );
}
