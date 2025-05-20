import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import classNames from "classnames";

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = location.pathname === "/";
  const logo = "/LogoLS1.png";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClass = classNames(
    "shadow-md transition-all duration-800 ease-in-out z-50",
    {
      "px-6 py-4 bg-cover bg-center w-full":
        isHome && !scrolled,
      "fixed top-0 w-full bg-gray-900 text-white": scrolled || !isHome,
    }
  );

  return (
    <header
      className={headerClass}
      style={
        isHome && !scrolled
          ? { backgroundImage: "url('/head-vyazanie-kryuchkom-22.jpg')" }
          : { backgroundColor: "#1f2937" }
      }
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Лого та назва */}
        <div className="flex space-x-4 sm:flex-row items-center sm:space-x-4 text-center sm:text-left">
          <img src={logo} alt="logo" className="w-20 h-20 rounded-full bg-white p-1"/>
          <div>
            <h1 className="text-4xl text-pink-700 font-bold font-dancing tracking-wide">
              LS STUDIO
            </h1>
            <p className="text-pink-700 font-bold font-dancing text-sm">
              Love in little things
            </p>
          </div>
        </div>

        {/* Навігація (desktop) */}
        <nav className="hidden md:flex space-x-6 text-xl font-semibold uppercase">
          <a href="/" className="hover:underline">
            Glówna
          </a>
          <a href="/productsMain" className="hover:underline">
            Katalog wyrobów
          </a>
          <a href="/about" className="hover:underline">
            O nas
          </a>
        </nav>

        {/* Контакти */}
        <div className="text-center md:text-right">
          <div className="flex space-x-4 md:items-end md:text-right">            
            <div className="flex flex-row flex-wrap md:flex-row gap-2 items-end md:justify-end">
                <a
                href="https://www.facebook.com/larysa.shepetko"
                target="_blank"
                rel="noopener noreferrer"
                >
                <img src="/2023_Facebook_icon.svg.png" alt="Facebook" className="w-7 h-7" />
                </a>
                <a
                href="https://www.instagram.com/shepetko.larisa"
                target="_blank"
                rel="noopener noreferrer"
                >
                <img src="/Instagram.png" alt="Instagram" className="w-7 h-7" />
                </a>
                <a
                href="https://wa.me/48501577919"
                target="_blank"
                rel="noopener noreferrer"
                >
                <img src="/whatsapp logo.png" alt="WhatsApp" className="w-7 h-7" />
                </a>
                <a
                href="mailto:likashepetko@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                >
                <img src="/email-icon.svg" alt="Email" className="w-7 h-7" />
                </a>
            </div>
          </div>
        </div>

        {/* Додаткові кнопки */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="text-xs">
            Zaloguj
          </a>
          <span>|</span>
          <a href="#" className="text-xs">
            Zarejestruj
          </a>
          <button className="bg-pink-400 p-2 rounded-full">🔍</button>
          <button className="bg-pink-500 p-2 rounded-full">🛒</button>
        </div>

        {/* Кнопка мобільного меню */}
        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Мобільне меню */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-gray-800 text-white text-center mt-2 rounded-md">
          <a href="/" className="block hover:underline">
            Glówna
          </a>
          <a href="/productsMain" className="block hover:underline">
            Katalog
          </a>
          <a href="/about" className="block hover:underline">
            O nas
          </a>
          <hr className="my-2 border-gray-600" />
          <a href="/logIn" className="block hover:underline">
            Zaloguj
          </a>
          <a href="/signUp" className="block hover:underline">
            Zarejestruj
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
