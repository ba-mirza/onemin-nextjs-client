import Breadcrumbs from "@/components/list/Breadcrumbs";
import ListHeader from "@/components/list/ListHeader";
import ListNews from "@/components/list/ListNews";

interface ListPageProps {
  params: { slug: string };
}

export default function ListPage({ params }: ListPageProps) {
  const listTitle = params.slug === "sayasat" ? "Саясат" : "";

  const news = [
    {
      title: "Казино жарнамалаған блогерлерге қылмыстық іс қозғала ма?",
      description:
        "Онлайн казиноларды жарнамалағаны үшін танымал блогерлер Қайсар Қамза мен Никонет заң алдында жауап беруі мүмкін.",
      date: "27.08.2025",
      views: 5931,
    },
    {
      title:
        "Назарбаевтың Конституция қабылдау ісіндегі рөліне әділ баға берілуі тиіс – Тоқаев",
      description:
        "29 тамыз күні ҚР Конституциясының 30 жылдығына арналған конференция...",
      date: "27.08.2025",
      views: 5931,
    },
    {
      title: "Тоқаев 8 қыркүйекте Қазақстан халқына Жолдау жасайды",
      description:
        "8 қыркүйек күні Мемлекет басшысы жыл сайынғы Жолдауын жариялайды.",
      date: "27.08.2025",
      views: 5931,
    },
    {
      title:
        "Қытай Қазақстанға 7,5 млрд теңге көлемінде қаржылай қолдау көрсетпек",
      description:
        "Қытай Қазақстанға қазіргі бағам бойынша 100 миллион юань бөлмек.",
      date: "27.08.2025",
      views: 5931,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 font-sans">
      <Breadcrumbs
        items={[{ label: "Басты бет", href: "/" }, { label: listTitle }]}
      />
      <ListHeader title={listTitle} />
      <ListNews news={news} />
    </div>
  );
}
