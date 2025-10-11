import NewsCard from "@/app/components/NewsCard"

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {news.map((item, i) => (
        <NewsCard key={i} {...item} /> 
      ))}
    </ div>
  )
}
