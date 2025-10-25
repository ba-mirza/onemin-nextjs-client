"use client";

import { navigations } from "@/constants";
import Link from "next/link";
import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Lang = "ru" | "kz";

export default function Header() {
  const [lang, setLang] = useState<Lang>("kz");
  const { slug } = useParams();

  const defineLang = (value: Lang) => {
    setLang(value);
  };

  // #FIX: Initialize lang state with localStorage value
  useEffect(() => {
    const existingLang = localStorage.getItem("lang");
    if (!existingLang) {
      localStorage.setItem("lang", lang as Lang);
      setLang(existingLang as Lang);
    } else {
      localStorage.removeItem("lang");
    }
  }, [lang]);

  return (
    <header className="bg-primary text-white py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">
            <Link href="/">ONEMIN.KZ</Link>
          </h1>
          <div className="h-6 w-px bg-white/50"></div>
        </div>

        <nav className="flex space-x-6">
          {navigations.map((item) => (
            <Link
              key={item.slug}
              href={item.href}
              className={`font-bold uppercase text-lg hover:underline transition-colors ${item.slug === slug ? "underline" : ""}`}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex gap-2">
          <Input
            className="placeholder:text-black border-black bg-white"
            type="text"
            placeholder="Іздеу"
          />
          <Select onValueChange={defineLang}>
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder={lang} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ru">
                <span className="fi fi-ru">RU</span>
              </SelectItem>
              <SelectItem value="kz">
                <span className="fi fi-kz">KZ</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}
