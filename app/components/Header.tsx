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
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">ONEMIN.KZ</ h1>
          <div className="h-6 w-px bg-white/50"></ div>
        </ div>

        
        <nav className="flex space-x-6">
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

          <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Іздеу..."
            className="px-3 py-1 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition">
            RU
          </ button>
        </ div>
      </ div>
    </ header>
  )
}

