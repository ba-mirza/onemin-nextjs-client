"use client";

import { useState, useTransition } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, usePathname } from "next/navigation";

interface LanguageSwitcherProps {
  currentLang: "ru" | "kz";
}

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [lang, setLang] = useState<"ru" | "kz">(currentLang);

  const handleChange = (value: "ru" | "kz") => {
    setLang(value);

    startTransition(() => {
      // Replace current language in pathname with new one
      const newPathname = pathname.replace(/^\/(kz|ru)/, `/${value}`);
      router.push(newPathname);
    });
  };

  return (
    <Select value={lang} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="w-[100px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="kz">Қазақша</SelectItem>
        <SelectItem value="ru">Русский</SelectItem>
      </SelectContent>
    </Select>
  );
}
