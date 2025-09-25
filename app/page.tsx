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
        <div className="md:col-span-2 bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">{news[0].title}</ h1>
          <p className="text-gray-600">{news[0].description}</ p>
        </ div>

        {/* Secondary news */}
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">{news[1].title}</ h2>
            <p className="text-gray-600">{news[1].description}</ p>
          </ div>
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2">{news[2].title}</ h2>
            <p className="text-gray-600">{news[2].description}</ p>
          </ div>
        </ div>
      </ div>

      {/* News grid */}
      <h2 className="text-2xl font-bold mb-6">Жаңалықтар</ h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {news.slice(3).map((item, index) => (
          <NewsCard
            key={index}
            title={item.title}
            description={item.description} />
        ))}
      </ div>
    </>
  )
}

