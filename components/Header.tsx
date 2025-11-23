"use client";

import { navigations } from "@/constants";
import Link from "next/link";
import { Input } from "./ui/input";

import { useParams } from "next/navigation";

export default function Header({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const lang = (params.lang as "ru" | "kz") || "kz";
  const currentCategory = params.category as string | undefined;

  return (
    <header className="bg-primary text-white py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">
            <Link href={`/${lang}`}>ONEMIN.KZ</Link>
          </h1>
          <div className="h-6 w-px bg-white/50"></div>
        </div>

        <nav className="flex space-x-6">
          {navigations.map((item) => (
            <Link
              key={item.slug}
              href={`/${lang}${item.href}`}
              className={`font-bold uppercase text-lg hover:underline transition-colors ${item.slug === currentCategory ? "underline" : ""}`}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex gap-2">
          <Input
            className="placeholder:text-white"
            type="text"
            placeholder="Іздеу"
          />
          {children}
        </div>
      </div>
    </header>
  );
}
