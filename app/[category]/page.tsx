import { notFound } from "next/navigation";
import Link from "next/link";
import { Article } from "@/lib/supabase/types/props";
import { navigations } from "@/constants";
import { getArticlesByCategory } from "@/lib/supabase/actions/article.action";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryData = navigations.find((nav) => nav.slug === category);

  if (!categoryData) {
    notFound();
  }

  const result = await getArticlesByCategory(category);

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
              href={`/${category}/${article.slug}`}
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
  return navigations.map((nav) => ({
    category: nav.slug,
  }));
}
