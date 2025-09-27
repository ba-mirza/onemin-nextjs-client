import NewsCard from "@/app/components/NewsCard"

export default function Home() {
  const news = [
    { title: "Big H1 Text", description: "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды" },
    { title: "H2 Text", description: "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды" },
    { title: "H2 Text", description: "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды" },
    { title: "Politics", description: "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды" },
    { title: "World", description: "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды" },
    { title: "Religion", description: "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды" },
    { title: "Interview", description: "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды" },
    { title: "Analytics", description: "Мәжіліс депутаты Нартай Аралбайұлы жаңа қызметке тағайындалды" },
  ]

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Main news */}
        <div className="md:col-span-2 bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
          <h1 className="text-3xl font-bold mb-4 leading-snug">{news[0].title}</ h1>
          <p className="text-gray-700 text-base leading-relaxed">{news[0].description}</ p>
        </div>

        {/* Secondary news */}
        <div className="space-y-6">
          {[news[1], news[2]].map((item, i) => (
            <div key={i} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
              <h2 className="text-lg font-semibold mb-2">{item.title}</ h2>
              <p className="text-gray-600 text-sm">{item.description}</ p>
            </ div>
          ))}
        </ div>
      </ div>

      {/* Жаңалықтар */}
      <h2 className="text-2xl font-bold mb-6">Жаңалықтар</ h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {news.slice(0, 4).map((item, index) => (
          <NewsCard key={`politics-${index}`} title={item.title} description={item.description} />
        ))}
      </ div>

      {/* Саясат */}
      <h2 className="text-2xl font-bold mb-6">Саясат</ h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {news.slice(0, 4).map((item, index) => (
          <NewsCard key={`politics-${index}`} title={item.title} description={item.description} />
        ))}
      </ div>

      {/* Әлем */}
      <h2 className="text-2xl font-bold mb-6">Әлем</ h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {news.slice(0, 4).map((item, index) => (
          <NewsCard key={`world-${index}`} title={item.title} description={item.description} />
        ))}
      </ div>

      {/* Дін */}
      <h2 className="text-2xl font-bold mb-6">Дін</ h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {news.slice(0, 4).map((item, index) => (
          <NewsCard key={`religion-${index}`} title={item.title} description={item.description} />
        ))}
      </ div>

      {/* Сұхбат */}
      <h2 className="text-2xl font-bold mb-6">Сұхбат</ h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {news.slice(0, 4).map((item, index) => (
          <NewsCard key={`interview-${index}`} title={item.title} description={item.description} />
        ))}
      </ div>

      {/* Сараптама */}
      <h2 className="text-2xl font-bold mb-6">Сараптама</ h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {news.slice(0, 4).map((item, index) => (
          <NewsCard key={`analytics-${index}`} title={item.title} description={item.description} />
        ))}
      </ div>

    </>
  )
}

