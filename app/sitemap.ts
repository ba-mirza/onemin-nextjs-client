import { MetadataRoute } from "next";
import { createSupabaseClient } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://oneminute.kz";
  const supabase = createSupabaseClient();

  const { data: articles } = await supabase
    .from("articles")
    .select("slug, category:categories(slug), updated_at, lang")
    .eq("is_published", true)
    .order("updated_at", { ascending: false });

  const articleUrls: MetadataRoute.Sitemap = (articles || []).map(
    (article) => ({
      url: `${baseUrl}/${article.lang}/${article.category.slug}/${article.slug}`,
      lastModified: new Date(article.updated_at),
      changeFrequency: "daily",
      priority: 0.8,
    }),
  );

  const { data: categories } = await supabase.from("categories").select("slug");

  const categoryUrls: MetadataRoute.Sitemap = [];
  if (categories) {
    for (const category of categories) {
      categoryUrls.push(
        {
          url: `${baseUrl}/kz/${category.slug}`,
          lastModified: new Date(),
          changeFrequency: "hourly",
          priority: 0.9,
        },
        {
          url: `${baseUrl}/ru/${category.slug}`,
          lastModified: new Date(),
          changeFrequency: "hourly",
          priority: 0.9,
        },
      );
    }
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${baseUrl}/kz`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${baseUrl}/ru`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    ...categoryUrls,
    ...articleUrls,
  ];
}
