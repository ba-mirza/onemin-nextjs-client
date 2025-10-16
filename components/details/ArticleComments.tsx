interface ArticleCommentsProps {
  comments: string[]
}

export default function ArticleComments({ comments }: ArticleCommentsProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-bold mb-2">Пікірлер</ h2>
      <ul className="list-disc pl-5 space-y-2">
        {comments.map((comment, i) => (
          <li key={i} className="text-gray-700">
            {comment}
          </ li>
        ))}
      </ ul>
    </ div>
  )
}
