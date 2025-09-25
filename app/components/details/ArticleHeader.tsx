interface ArticleHeaderProps {
  title: string
  date: string
  views: number
  tags: string[]
}

export default function ArticleHeader({ title, date, views, tags }: ArticleHeaderProps) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">{title}</ h1>
      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
        <span>{date}</ span>
        <span>{views} қаралым</ span>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs" >
              #{tag}
            </ span>
          ))}
        </ div>
      </ div>
    </>
  )
}
