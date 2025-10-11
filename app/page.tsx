import NewsCard from "@/app/components/NewsCard"

export default function Home() {
  const news = [
    { title: "Big H1 Text", description: "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды", date: "27.08.2025", views: 5900 },
    { title: "H2 Text", description: "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды", date: "27.08.2025", views: 5900 },
    { title: "H2 Text", description: "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды", date: "27.08.2025", views: 5900 },
    { title: "Politics", description: "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды", date: "27.08.2025", views: 5900 },
    { title: "World", description: "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды", date: "27.08.2025", views: 5900 },
    { title: "Religion", description: "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды", date: "27.08.2025", views: 5900 },
    { title: "Interview", description: "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды", date: "27.08.2025", views: 5900 },
    { title: "Analytics", description: "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды", date: "27.08.2025", views: 5900 },
  ]

  return (
    <>
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Main news */}
        <div className="md:col-span-2 bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
          <h1 className="text-3xl font-bold mb-4 leading-snug">{news[0].title}</h1>
          <p className="text-gray-700 text-base leading-relaxed">{news[0].description}</p>
        </div>

        {/* Secondary news */}
        <div className="space-y-6">
          {news.slice(1, 3).map(({ title, description }, i) => (
            <div key={i} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
              <h2 className="text-lg font-semibold mb-2">{title}</ h2>
              <p className="text-gray-600 text-sm">{description}</ p>
            </ div>
          ))}
        </ div>
      </ div>


      {[
        { title: "Жаңалықтар" },
        { title: "Саясат" },
        { title: "Әлем" },
        { title: "Дін" },
        { title: "Сұхбат" },
        { title: "Сараптама" },
      ].map(({ title }, sectionIndex) => (
        <section key={sectionIndex} className="mb-10">
          <h2 className="text-2xl font-bold mb-6">{title}</ h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {news.slice(3, 7).map(({ title, description, date, views }, index) => (
              <NewsCard
                key={`${sectionIndex}-${index}`}
                title={title}
                description={description}
                date={date}
                views={views}
              />
            ))}
          </ div>
        </ section>
      ))}
    </ >
  )
}
