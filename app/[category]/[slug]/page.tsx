import { notFound, redirect } from "next/navigation";
import { getArticleBySlug } from "@/lib/supabase/actions/article.action";
import Image from "next/image";
import { tiptapToHtml } from "@/lib/tiptap-to-html";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CalendarDays, Eye } from "lucide-react";

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
      <h1 className="text-4xl font-bold mb-4 uppercase">{article.title}</h1>

      <div className="flex justify-start gap-4 font-semibold text-md text-muted-foreground mt-4">
        <span className="flex gap-2 items-center">
          <CalendarDays />
          {new Date(article.published_at).toLocaleDateString("ru-RU")}
        </span>
        <span className="flex gap-2 items-center">
          <Eye />
          {displayedViews.toLocaleString("ru-RU")} просмотров
        </span>
      </div>

      {article.preview_image && (
        <div className="mb-8 mt-3">
          <Image
            src={article.preview_image}
            alt={article.title}
            width={867}
            height={455}
            className="object-cover rounded-lg"
            priority
          />
        </div>
      )}

      {article.excerpt && (
        <p className="text-xl text-muted-foreground mb-8">{article.excerpt}</p>
      )}

      <div
        className="prose prose-lg max-w-none text-xl"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {article.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          <Separator orientation="horizontal" />
          {article.tags.map((tag) => (
            <Badge
              key={tag.id}
              className="bg-[#C53F3F] text-white text-md select-none mt-4"
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      )}
      <Button className="text-md bg-[#202020] text-white uppercase py-2 px-4 mt-3 font-bold cursor-pointer">
        Поделиться
      </Button>
    </article>
  );
}
