"use client";

import { useEffect } from "react";
import { incrementArticleViews } from "@/lib/supabase/actions/article.action";

interface ViewCounterProps {
  articleId: string;
}

export function ViewCounter({ articleId }: ViewCounterProps) {
  useEffect(() => {
    const incrementViews = async () => {
      await incrementArticleViews(articleId);
    };

    incrementViews();
  }, [articleId]);

  return null;
}
