export function timeAgo(date: Date | string, lang: "ru" | "kz"): string {
  const now = new Date();
  const publishedDate = typeof date === "string" ? new Date(date) : date;
  const secondsAgo = Math.floor(
    (now.getTime() - publishedDate.getTime()) / 1000,
  );

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  const translations = {
    ru: {
      year: ["год", "года", "лет"],
      month: ["месяц", "месяца", "месяцев"],
      week: ["неделя", "недели", "недель"],
      day: ["день", "дня", "дней"],
      hour: ["час", "часа", "часов"],
      minute: ["минута", "минуты", "минут"],
      ago: "назад",
      justNow: "только что",
    },
    kz: {
      year: ["жыл", "жыл", "жыл"],
      month: ["ай", "ай", "ай"],
      week: ["апта", "апта", "апта"],
      day: ["күн", "күн", "күн"],
      hour: ["сағат", "сағат", "сағат"],
      minute: ["минут", "минут", "минут"],
      ago: "бұрын",
      justNow: "жаңа ғана",
    },
  };

  if (secondsAgo < 60) {
    return translations[lang].justNow;
  }

  for (const [key, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(secondsAgo / seconds);

    if (interval >= 1) {
      const word = getPluralForm(
        interval,
        translations[lang][key as keyof typeof intervals],
      );
      return `${interval} ${word} ${translations[lang].ago}`;
    }
  }

  return translations[lang].justNow;
}

function getPluralForm(number: number, forms: string[]): string {
  const cases = [2, 0, 1, 1, 1, 2];

  if (number % 100 > 4 && number % 100 < 20) {
    return forms[2];
  }

  return forms[cases[Math.min(number % 10, 5)]];
}
