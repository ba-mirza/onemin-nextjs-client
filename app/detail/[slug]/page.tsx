import ArticleComments from "@/components/details/ArticleComments";
import ArticleContent from "@/components/details/ArticleContent";
import ArticleHeader from "@/components/details/ArticleHeader";
import { notFound } from "next/navigation";

interface NewsDetailProps {
  params: {
    slug: string;
  };
}

export default function NewsDetail({ params }: NewsDetailProps) {
  const article = {
    title: "Казино жарнамалаған блогерлерге қылмыстық іс қозғала ма?",
    date: "27.08.2025",
    views: 5931,
    tags: ["казино", "ставка", "блогер", "тағзир"],
    content: `
      Онлайн казиноларды жарнамалағаны үшін танымал блогерлер Қайсар Қамза мен
      Никонет заң алдында жауап беруі мүмкін. Экономист әрі сарапшы Айбар Олжайдың
      жазбасына қарағанда, бұл жолы әкімшілік жаза емес, қылмыстық жауапкершілік
      мәселесі көтеріліп отыр.

      Олжайдың айтуынша, Қайсар Қамза онлайн құмар ойындарына тіркелу жолдарын егжей-
      тегжейлі көрсеткен. Бұл әрекет мемлекет тарапынан қатаң бақылауға алынып, блогердің
      барлық қаржылық шоттары бұғатталған.
    `,
    comments: [
      "Никонетті түрмеге жаба ма екен?",
      "Қайраттың футболкасындағы 1xBet жарнамасы қайда қалды?",
      "Онлайн казиноларды біржола бұғаттау керек, жарнамалағандарды жазалаудан бұрын",
      "Кейбір блогерлер әлі күнге дейін жарнама жасап жүр, мысалы Ақбота",
      "Қайсар шетелде болса, экстрадиция жасала ма?",
    ],
  };

  if (!article) return notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-10 font-sans">
      <ArticleHeader
        title={article.title}
        date={article.date}
        views={article.views}
        tags={article.tags}
      />
      <ArticleContent content={article.content} />
      <ArticleComments comments={article.comments} />
    </article>
  );
}
