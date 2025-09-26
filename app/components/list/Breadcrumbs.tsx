interface BreadcrumbsProps {
  items: { label: string; href?: string }[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="text-sm text-gray-500 mb-4">
      {items.map((item, idx) => (
        <span key={item.label}>
          {item.href ? (
            <a href={item.href} className="hover:underline">
              {item.label}
            </ a>
          ) : (
            <span>{item.label}</ span>
          )}
          {idx < items.length - 1 && " -> "}
        </ span>
      ))}
    </ nav>
  )
}
