import { notFound, redirect } from "next/navigation";
import { getArticleBySlug } from "@/lib/supabase/actions/article.action";
import Image from "next/image";
import { tiptapToHtml } from "@/lib/tiptap-to-html";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays } from "lucide-react";
import { Metadata } from "next";
import { ViewCounter } from "@/components/view-counter";
import { ShareButton } from "@/components/share-button";

interface ArticlePageProps {
  params: Promise<{
    category: string;
    slug: string;
    lang: "ru" | "kz";
  }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { category, slug, lang } = await params;

  const result = await getArticleBySlug(slug, lang);

  if (result.status !== "success") {
    return {};
  }

  const article = result.data;
  const url = `https://oneminute.kz/${lang}/${category}/${slug}`;

  return {
    title: `${article.title} – ONEMIN.KZ`,
    description: article.excerpt || article.title,
    alternates: {
      canonical: url,
      languages: {
        kz: `https://oneminute.kz/kz/${category}/${slug}`,
        ru: `https://oneminute.kz/ru/${category}/${slug}`,
      },
    },
    openGraph: {
      title: article.title,
      description: article.excerpt || article.title,
      url,
      siteName: "ONEMIN.KZ",
      locale: lang === "kz" ? "kk_KZ" : "ru_RU",
      type: "article",
      publishedTime: article.published_at,
      images: article.preview_image
        ? [
            {
              url: article.preview_image,
              width: 867,
              height: 455,
              alt: article.title,
            },
          ]
        : [],
      tags: article.tags.map((tag) => tag.name),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt || article.title,
      images: article.preview_image ? [article.preview_image] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, slug, lang } = await params;

  if (lang !== "ru" && lang !== "kz") {
    notFound();
  }

  const result = await getArticleBySlug(slug, lang);

  if (result.status !== "success") {
    console.log("Not success", result);
    notFound();
  }

  const article = result.data;

  if (article.category.slug !== category) {
    redirect(`/${lang}/${article.category.slug}/${slug}`);
  }

  const articleUrl = `https://oneminute.kz/${lang}/${article.category.slug}/${slug}`;

  const htmlContent = tiptapToHtml(article.content);

  const displayedViews =
    article.use_custom_views && article.views_count_custom
      ? article.views_count_custom
      : article.views_count;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt || article.title,
    image: article.preview_image || "",
    datePublished: article.published_at,
    dateModified: article.published_at,
    author: {
      "@type": "Organization",
      name: "ONEMIN.KZ",
    },
    publisher: {
      "@type": "Organization",
      name: "ONEMIN.KZ",
      logo: {
        "@type": "ImageObject",
        url: "https://oneminute.kz/logo.png",
      },
    },
    inLanguage: lang === "kz" ? "kk-KZ" : "ru-RU",
    keywords: article.tags.map((tag) => tag.name).join(", "),
  };

  return (
    <>
      <ViewCounter articleId={article.id} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-4 uppercase">{article.title}</h1>

        <div className="flex justify-start gap-4 font-semibold text-md text-muted-foreground mt-4">
          <span className="flex gap-2 items-center">
            <CalendarDays />
            {new Date(article.published_at).toLocaleDateString("ru-RU")}
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
          <p className="text-xl text-muted-foreground mb-8">
            {article.excerpt}
          </p>
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
        <ShareButton url={articleUrl} />
      </article>
    </>
  );
}
