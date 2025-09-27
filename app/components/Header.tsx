const navItems = [
  { label: "САЯСАТ", href: "/list/sayasat" },
  { label: "ӘЛЕМ", href: "/list/elem" },
  { label: "ДІН", href: "/list/din" },
  { label: "СҰХБАТ", href: "/list/suhbat" },
  { label: "САРАПТАМА", href: "/list/saraptama" },
]

export default function Header() {
  return (
    <header className="bg-primary text-white py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        <h1 className="text-2xl font-bold">ONEMIN.KZ</ h1>
        <nav className="space-x-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-gray-200 transition-colors"
            >
              {item.label}
            </ a>
          ))}
        </ nav>
      </ div>
    </ header>
  )
}
