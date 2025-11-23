import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getAllArticles } from "@/lib/supabase/actions/article.action";
import Link from "next/link";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface HomePageProps {
  params: Promise<{ lang: "ru" | "kz" }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { lang } = await params;

  const titles = {
    kz: "ONEMIN.KZ – Қазақстанның жаңалықтары",
    ru: "ONEMIN.KZ – Новости Казахстана",
  };

  const descriptions = {
    kz: "Қазақстанның соңғы жаңалықтары: саясат, экономика, спорт, мәдениет",
    ru: "Свежие новости Казахстана: политика, экономика, спорт, культура",
  };

  const title = titles[lang];
  const description = descriptions[lang];
  const url = `https://oneminute.kz/${lang}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        kz: "https://oneminute.kz/kz",
        ru: "https://oneminute.kz/ru",
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "ONEMIN.KZ",
      locale: lang === "kz" ? "kk_KZ" : "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function Home({ params }: HomePageProps) {
  const { lang } = await params;

  if (lang !== "ru" && lang !== "kz") {
    notFound();
  }

  const result = await getAllArticles(lang);

  if (result.status !== "success") {
    return (
      <div>
        Ошибка загрузки статей: <br />
        {JSON.stringify(result)}
      </div>
    );
  }

  const articles = result.data;

  return (
    <>
      <section className="flex justify-between h-[665px] gap-6">
        <div className="flex flex-col gap-4 w-3/5">
          <div className="bg-[#E5E7EB] w-auto h-[350px] border border-gray-500 rounded-lg p-4">
            <h1>{articles[0].title}</h1>
          </div>
          <div className="flex items-center justify-between gap-4">
            {articles.slice(1, 3).map((item, index) => (
              <Link
                className="select-none"
                href={`/${lang}/${item.category.slug}/${item.slug}`}
                key={item.id}
              >
                <div
                  className="flex w-auto h-[300px] border border-gray-500 rounded-lg p-4 hover:border-purple-700"
                  key={index}
                >
                  <h2>{item.title}</h2>
                  <p>{item.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <ScrollArea className="h-auto w-[433px] rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-lg leading-none font-medium">
              Последние новости
            </h4>
            {articles.map((article) => (
              <Fragment key={article.id}>
                <div className="flex items-center gap-4 text-lg">
                  <Link
                    className="underline hover:text-purple-700"
                    href={`/${lang}/${article.category.slug}/${article.slug}`}
                  >
                    {article.title}
                  </Link>
                </div>
                <Separator className="my-2" />
              </Fragment>
            ))}
          </div>
        </ScrollArea>
      </section>
    </>
  );
}

export async function generateStaticParams() {
  return [{ lang: "kz" }, { lang: "ru" }];
}
