"use server";

import { getLanguage } from "@/lib/actions/language";
import { createSupabaseClient } from "..";
import {
  ApiResponse,
  errorResponse,
  successResponse,
} from "../types/api.response";
import { Article } from "../types/props";

export async function getAllArticles(): Promise<ApiResponse<Article[]>> {
  try {
    const supabase = createSupabaseClient();
    const lang = await getLanguage();

    const { data: articles, error: articleError } = await supabase
      .from("articles")
      .select(
        `
        id,
        title,
        slug,
        excerpt,
        preview_image,
        published_at,
        category:categories(id, name, slug),
        stats:article_stats(views_count)
      `,
      )
      .eq("lang", lang)
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (articleError) {
      return errorResponse(
        `Ошибка получения статей: ${articleError}`,
        "DATABASE_ERROR from getAllArticles()",
      );
    }

    return successResponse(articles);
  } catch (error) {
    return errorResponse(`Ошибка получения статей: ${error}`, "DATABASE_ERROR");
  }
}

export async function getArticlesByCategory(
  categorySlug: string,
): Promise<ApiResponse<any[]>> {
  try {
    const supabase = createSupabaseClient();
    const lang = await getLanguage();

    const { data: category, error: categoryError } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", categorySlug)
      .single();

    if (categoryError || !category) {
      return errorResponse("Категория не найдена", "NOT_FOUND");
    }

    const { data: articles, error } = await supabase
      .from("articles")
      .select(
        `
        id,
        title,
        slug,
        excerpt,
        preview_image,
        published_at,
        category:categories(id, name, slug),
        stats:article_stats(views_count)
      `,
      )
      .eq("category.id", category.id)
      .eq("is_published", true)
      .eq("lang", lang)
      .order("published_at", { ascending: false });

    if (error) {
      return errorResponse(
        `Ошибка получения статей: ${error.message}`,
        "DATABASE_ERROR",
      );
    }

    const articlesWithStats = articles.map((article) => ({
      ...article,
      views_count: article.stats?.views_count || 0,
    }));

    articlesWithStats.forEach((a) => delete a.stats);

    return successResponse(articlesWithStats);
  } catch (error) {
    console.error("Error fetching articles by category:", error);
    return errorResponse(
      error instanceof Error ? error.message : "Неизвестная ошибка",
      "INTERNAL_ERROR",
    );
  }
}

export async function getArticleBySlug(
  slug: string,
): Promise<ApiResponse<any>> {
  try {
    const supabase = createSupabaseClient();
    const lang = await getLanguage();

    const { data: article, error } = await supabase
      .from("articles")
      .select(
        `
        id,
        title,
        slug,
        excerpt,
        content,
        preview_image,
        published_at,
        use_custom_views,
        views_count_custom,
        category:categories(id, name, slug),
        tags:article_tags(
          tag:tags(id, name, slug)
        ),
        stats:article_stats(views_count)
      `,
      )
      .eq("slug", slug)
      .eq("is_published", true)
      .eq("lang", lang)
      .single();

    if (error || !article) {
      return errorResponse("Статья не найдена", "NOT_FOUND");
    }

    const articleWithDetails = {
      ...article,
      tags: article.tags.map((at) => at.tag),
      views_count: article.stats?.views_count || 0,
    };

    delete articleWithDetails.stats;

    return successResponse(articleWithDetails);
  } catch (error) {
    console.error("Error fetching article:", error);
    return errorResponse(
      error instanceof Error ? error.message : "Неизвестная ошибка",
      "INTERNAL_ERROR",
    );
  }
}
