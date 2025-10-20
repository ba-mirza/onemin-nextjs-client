interface NewsListItemProps {
  date: string;
  title: string;
  image?: string;
  href?: string;
}

export default function NewsListItem({
  date,
  title,
  image,
  href,
}: NewsListItemProps) {
  return (
    <a
      href={href || "#"}
      className="flex items-start gap-4 border-b border-gray-200 pb-4 hover:bg-gray-50 transition"
    >
      <div className="w-20 h-20 bg-gray-200 rounded-md flex-shrink-0">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-md"
          />
        )}
      </div>

      <div className="flex-1">
        <p className="text-sm text-gray-500 mb-1">{date}</p>
        <h3 className="text-base font-semibold leading-snug">{title}</h3>
      </div>
    </a>
  );
}
