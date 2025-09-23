const footerLinks = [
  { label: "Біз туралы", href: "#" },
  { label: "Контактілер", href: "#" },
  { label: "Жарнама", href: "#" },
]

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-10 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">
          © {new Date().getFullYear()} ONEMIN.KZ. Барлық құқықтар қорғалған.
        </ p>
        <nav className="flex space-x-4 mt-2 md:mt-0">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-gray-200 transition-colors text-sm"
            >
              {link.label}
            </ a>
          ))}
        </ nav>
      </ div>
    </ footer>
  )
}
