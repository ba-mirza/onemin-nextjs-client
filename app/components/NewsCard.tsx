interface NewsCardProps {
  title: string
  description: string
  image?: string
  href?: string
}

export default function NewsCard({ title, description, image, href }: NewsCardProps) {
  return (
    <a
      href={href || "#"}
      className="block bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition" >
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover" />
      )}
      
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{title}</ h2>
        <p className="text-gray-600">{description}</ p>
      </ div>
    </ a>
  )
}