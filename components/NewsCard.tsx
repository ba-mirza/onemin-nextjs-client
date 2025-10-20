import { FaRegClock, FaRegEye } from "react-icons/fa";

interface NewsCardProps {
  title: string;
  description: string;
  image?: string;
  href?: string;
  date?: string;
  views?: number;
}

export default function NewsCard({
  title,
  description,
  image,
  href,
  date,
  views,
}: NewsCardProps) {
  return (
    <a
      href={href || "#"}
      className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
    >
      {image && (
        <img src={image} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-3">{description}</p>

        <div className="flex items-center text-gray-500 text-xs space-x-4">
          {date && (
            <span className="flex items-center space-x-1">
              <FaRegClock className="w-4 h-4" />
              <span>{date}</span>
            </span>
          )}
          {views !== undefined && (
            <span className="flex items-center space-x-1">
              <FaRegEye className="w-4 h-4" />
              <span>{views}</span>
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
