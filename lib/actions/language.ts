"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function setLanguage(lang: "ru" | "kz") {
  const cookieStore = await cookies();

  cookieStore.set("lang", lang, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });

  revalidatePath("/", "layout");
}

export async function getLanguage(): Promise<"ru" | "kz"> {
  const cookieStore = await cookies();
  return (cookieStore.get("lang")?.value as "ru" | "kz") || "kz";
}
