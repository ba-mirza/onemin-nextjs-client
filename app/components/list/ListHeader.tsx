interface ListHeaderProps {
  title: string
}

export default function ListHeader({ title }: ListHeaderProps) {
  return <h1 className="text-3xl font-bold mb-6">{title}</ h1>
}
