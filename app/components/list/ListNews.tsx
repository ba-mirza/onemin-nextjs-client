interface NewsItem {
  title: string
  description: string
  date: string
  views: number
}

interface ListNewsProps {
  news: NewsItem[]
}

export default function ListNews({ news }: ListNewsProps) {
  return (
    <div className="space-y-6">
      {news.map((item, i) => (
        <div
          key={i}
          className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">{item.title}</ h2>
          <p className="text-gray-600 mb-2">{item.description}</ p>
          <div className="text-sm text-gray-500">
            {item.date} • {item.views} қаралым
          </ div>
        </ div>
      ))}
    </ div>
  )
}
