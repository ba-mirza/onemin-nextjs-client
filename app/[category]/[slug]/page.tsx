import { notFound, redirect } from "next/navigation";
import { getArticleBySlug } from "@/lib/supabase/actions/article.action";
import Image from "next/image";
import { tiptapToHtml } from "@/lib/tiptap-to-html";

interface ArticlePageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, slug } = await params;
  const result = await getArticleBySlug(slug);

  if (result.status !== "success") {
    console.log("Not success", result);
    notFound();
  }

  const article = result.data;

  if (article.category.slug !== category) {
    redirect(`/${article.category.slug}/${slug}`);
  }

  const htmlContent = tiptapToHtml(article.content);

  const displayedViews =
    article.use_custom_views && article.views_count_custom
      ? article.views_count_custom
      : article.views_count;

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      {article.preview_image && (
        <div className="relative w-full h-[400px] mb-8">
          <Image
            src={article.preview_image}
            alt={article.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      )}

      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

      <div className="flex gap-4 text-sm text-muted-foreground mb-8">
        <span>
          {new Date(article.published_at).toLocaleDateString("ru-RU")}
        </span>
        <span>•</span>
        <span>{displayedViews.toLocaleString("ru-RU")} просмотров</span>
        <span>•</span>
        <span>{article.category.name}</span>
      </div>

      {article.excerpt && (
        <p className="text-xl text-muted-foreground mb-8">{article.excerpt}</p>
      )}

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {article.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 bg-muted rounded-full text-sm"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
