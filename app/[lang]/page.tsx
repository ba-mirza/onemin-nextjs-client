import { getAllArticles } from "@/lib/supabase/actions/article.action";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import { timeAgo } from "@/lib/timeAgo";

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
    kz: "Қазақстан мен шетелдегі маңызды оқиғалардан жедел түрде хабар тарататын сайт",
    ru: "Сайт, предоставляющий мгновенные новости о важных событиях в Казахстане и за рубежом",
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

  const mainArticle = result.data[0];
  const sideArticles = result.data.slice(1, 5);
  const othersData = result.data.slice(5);

  return (
    <article className="container mx-auto px-4 py-8 max-w-[1280px]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2">
          <div
            className="relative w-full rounded-2xl overflow-hidden bg-gray-200 group"
            style={{ height: "500px" }}
          >
            <Image
              src={mainArticle.preview_image}
              alt={mainArticle.title}
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-700 group-hover:scale-105"
              priority
            />

            <div className="absolute bottom-6 left-6 right-6 md:w-[85%] lg:w-[70%] bg-white hover:outline-blue-700 p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-2 mb-3 text-sm">
                <span className="font-bold text-red-600">
                  onemin.kz | Жаңалықтар
                </span>
                <span className="text-gray-400">
                  • {timeAgo(mainArticle.published_at, lang)}
                </span>
              </div>

              <Link
                href={`/${lang}/${mainArticle.category.slug}/${mainArticle.slug}`}
              >
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight hover:text-blue-700 transition-colors mb-2">
                  {mainArticle.title}
                </h1>
              </Link>

              <p className="text-gray-600 line-clamp-2 text-sm md:text-base">
                {mainArticle.excerpt || mainArticle.title}
              </p>
            </div>
          </div>
        </section>

        <aside className="flex flex-col gap-6">
          {sideArticles.map((article) => (
            <article key={article.id} className="flex gap-4 group items-start">
              <div
                className="relative shrink-0 rounded-lg overflow-hidden bg-gray-200"
                style={{ width: "120px", height: "90px" }}
              >
                {article.preview_image && (
                  <Image
                    src={article.preview_image}
                    alt={article.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-300"
                    sizes="120px"
                  />
                )}
              </div>

              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="font-bold text-red-600">
                    onemin.kz | Жаңалықтар
                  </span>
                  <span>• {timeAgo(article.published_at, lang)}</span>
                </div>

                <Link
                  href={`/${lang}/${article.category.slug}/${article.slug}`}
                  className="font-medium text-gray-900 leading-snug hover:text-blue-700 line-clamp-3 text-sm md:text-base"
                >
                  {article.title}
                </Link>

                <span className="text-xs text-gray-500 font-medium mt-1">
                  {article.category.name} • 1 мин оқу
                </span>
              </div>
            </article>
          ))}
        </aside>
      </div>

      <section className="mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Соңғы жаңалықтар</h2>
          <Link
            href={`/${lang}/all`}
            className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
          >
            Көру
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {othersData.slice(0, 3).map((article) => (
            <article key={article.id} className="flex flex-col group">
              {/* КАРТИНКА */}
              <div
                className="relative w-full bg-gray-200 overflow-hidden rounded-2xl mb-4"
                style={{ height: "240px" }}
              >
                <Image
                  src={article.preview_image}
                  alt={article.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-bold text-gray-900">
                  onemin.kz | Жаңалықтар
                </span>
                <span className="text-sm text-gray-500">
                  • {timeAgo(article.published_at, lang)}
                </span>
              </div>

              <Link href={`/${lang}/${article.category.slug}/${article.slug}`}>
                <h3 className="text-xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-blue-700 transition-colors">
                  {article.title}
                </h3>
              </Link>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                {article.excerpt || article.title}
              </p>

              <div className="flex items-center gap-2 text-xs mt-auto">
                <span className="text-red-600 font-medium">
                  {article.category.name}
                </span>
                <span className="text-gray-500">• 1 мин оқу</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}

export async function generateStaticParams() {
  return [{ lang: "kz" }, { lang: "ru" }];
}
