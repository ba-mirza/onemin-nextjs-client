"use client";

import { useState, useTransition } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { setLanguage } from "@/lib/actions/language";

interface LanguageSwitcherProps {
  currentLang: "ru" | "kz";
}

export function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [lang, setLang] = useState<"ru" | "kz">(currentLang);

  const handleChange = (value: "ru" | "kz") => {
    setLang(value);

    startTransition(async () => {
      await setLanguage(value);
      router.refresh();
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
