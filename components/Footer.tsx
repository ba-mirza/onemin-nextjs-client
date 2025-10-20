import {
  FaWhatsapp,
  FaTiktok,
  FaInstagram,
  FaTelegramPlane,
} from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

type FooterLink = {
  label: string;
  href: string;
  active?: boolean;
};

const footerLinks: FooterLink[] = [
  { label: "БАСТЫ БЕТ", href: "#", active: true },
  { label: "САЯСАТ", href: "#" },
  { label: "ӘЛЕМ", href: "#" },
  { label: "ДІН", href: "#" },
  { label: "СҰХБАТ", href: "#" },
  { label: "САРАПТАМА", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-gray-200 mt-16 py-10">
      <div className="max-w-6xl mx-auto px-4 text-center flex flex-col items-center">
        <div className="flex justify-center gap-5 mb-6 text-2xl">
          <a href="#" className="text-green-500 hover:opacity-80 transition">
            <FaWhatsapp />
          </a>
          <a href="#" className="text-foreground hover:opacity-70 transition">
            <FaTiktok />
          </a>
          <a href="#" className="text-pink-600 hover:opacity-80 transition">
            <FaInstagram />
          </a>
          <a href="#" className="text-black hover:opacity-80 transition">
            <FaThreads />
          </a>
          <a href="#" className="text-sky-500 hover:opacity-80 transition">
            <FaTelegramPlane />
          </a>
        </div>

        <h1 className="text-4xl font-extrabold tracking-widest mb-3">
          ONEMIN.KZ
        </h1>
        <p className="text-sm font-medium text-gray-600 mb-6">
          ҚАЗАҚСТАНДЫҚ ОНЛАЙН ЖАҢАЛЫҚТАР ПОРТАЛЫ
        </p>

        <p className="max-w-3xl mx-auto text-gray-600 text-sm leading-relaxed mb-6">
          БІЗ ЕЛІМІЗДЕ ЖӘНЕ ӘЛЕМДЕ БОЛЫП ЖАТҚАН МАҢЫЗДЫ ОҚИҒАЛАР ТУРАЛЫ ЖЕДЕЛ
          ӘРІ СЕНІМДІ АҚПАРАТ ҰСЫНАМЫЗ.{" "}
          <span className="font-semibold text-foreground">
            САЯСАТ, ЭКОНОМИКА, ҚОҒАМ ЖӘНЕ МӘДЕНИЕТ
          </span>{" "}
          САЛАЛАРЫНДАҒЫ ӨЗЕКТІ ЖАҢАЛЫҚТАРДЫ БІЗДЕН ТАБА АЛАСЫЗ.
        </p>

        <div className="text-gray-700 text-sm mb-8">
          <p>ҚР, АТЫРАУ Қ., ЫНТЫМАҚ ДОЛИНА, 911</p>
          <p>+7 707 1373207 &nbsp; | &nbsp; ASSEL98@GMAIL.COM</p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 mb-8 font-semibold text-sm">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`transition-colors ${
                link.active
                  ? "text-primary"
                  : "text-gray-800 hover:text-primary"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="text-xs text-gray-500">
          © {new Date().getFullYear()}. «ONEMIN.KZ» АҚПАРАТТЫҚ ПОРТАЛЫ. БАРЛЫҚ
          ҚҰҚЫҚТАР ҚОРҒАЛҒАН
        </div>

        <div className="mt-2 text-xs text-gray-500 flex justify-center items-center gap-1">
          CREATED BY → <span className="font-semibold">TODAY.DEVELOPMENT</span>
        </div>
      </div>
    </footer>
  );
}
