import { notFound } from "next/navigation";
import Link from "next/link";
import { Article } from "@/lib/supabase/types/props";
import { navigations } from "@/constants";
import { getArticlesByCategory } from "@/lib/supabase/actions/article.action";
import { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{ category: string; lang: "ru" | "kz" }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category, lang } = await params;

  const categoryData = navigations.find((nav) => nav.slug === category);

  if (!categoryData) {
    return {};
  }

  const title = `${categoryData.title} – ONEMIN.KZ`;
  const description =
    lang === "kz"
      ? `${categoryData.title} бойынша соңғы жаңалықтар мен сараптама`
      : `Последние новости и аналитика по теме ${categoryData.title}`;
  const url = `https://oneminute.kz/${lang}/${category}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        kz: `https://oneminute.kz/kz/${category}`,
        ru: `https://oneminute.kz/ru/${category}`,
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
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category, lang } = await params;

  if (lang !== "ru" && lang !== "kz") {
    notFound();
  }

  const categoryData = navigations.find((nav) => nav.slug === category);

  if (!categoryData) {
    notFound();
  }

  const result = await getArticlesByCategory(category, lang);

  if (result.status !== "success") {
    return <div>Ошибка загрузки статей</div>;
  }

  const articles = result.data;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8">{categoryData.title}</h1>

      {articles.length === 0 ? (
        <p className="text-muted-foreground">Статей пока нет</p>
      ) : (
        <div className="grid gap-6">
          {articles.map((article: Article) => (
            <Link
              key={article.id}
              href={`/${lang}/${category}/${article.slug}`}
              className="block border rounded-lg p-6 hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-bold mb-2 underline">
                {article.title}
              </h2>
              {article.excerpt && (
                <p className="text-muted-foreground mb-4">{article.excerpt}</p>
              )}
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>
                  {new Date(article.published_at).toLocaleDateString("ru-RU")}
                </span>
                <span>{article.views_count} просмотров</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  const params = [];
  for (const nav of navigations) {
    params.push({ category: nav.slug, lang: "kz" as const });
    params.push({ category: nav.slug, lang: "ru" as const });
  }
  return params;
}
