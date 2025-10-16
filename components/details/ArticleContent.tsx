interface ArticleContentProps {
  content: string
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div className="prose max-w-none mb-8">
      {content.split("\n").map((p, i) => (
        <p key={i} className="mb-4 text-gray-800 leading-relaxed">
          {p}
        </ p>
      ))}
    </ div>
  )
}
