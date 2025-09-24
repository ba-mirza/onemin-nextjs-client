import NewsCard from "@/app/components/NewsCard"

const news = [
  {
    title: "",
    description: "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды",
    image: "/images/news1.jpg",
    href: "#",
  },
  {
    title: "",
    description: "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды",
    image: "/images/news2.jpg",
    href: "#",
  },
  {
    title: "",
    description: "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды",
    image: "/images/news3.jpg",
    href: "#",
  },
]

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Жаңалықтар</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {news.map((item, idx) => (
          <NewsCard key={idx} {...item} />
        ))}
      </ div>
    </ main>
  )
}
