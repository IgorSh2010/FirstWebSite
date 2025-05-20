import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import classNames from "classnames";

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // змінюємо стиль при скролі більше 50px
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";
  const logo = "/LogoLS1.png";

  const headerClass = classNames(
    "shadow-md transition-all duration-800 ease-in-out",
      {
        "text-green-900 px-6 py-6 bg-cover bg-center w-full": isHome && !scrolled,
        "fixed top-0 w-full z-50 bg-gray-900 text-white shadow-md": scrolled || !isHome,
        //"fixed top-0 w-full z-50 text-white shadow-md": scrolled,
      }
    );

  return (
  <>
      {isHome ? (
        // Хедер тільки для головної
        <header className={headerClass}
                style={isHome && !scrolled
                        ? { backgroundImage: "url('/head-vyazanie-kryuchkom-22.jpg')" }
                        : { backgroundColor: "#1f2937" }}>
          <div className="max-w-7xl mx-auto rounded flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={logo}
                alt="logo"
                className="w-20 h-20 rounded-full bg-white p-1"
              />
              <div className="items-center space-x-3">
                <h1 className="text-4xl text-pink-700 font-bold font-dancing tracking-wide">LS STUDIO</h1>
                <p  className="text-pink-700 font-bold font-dancing tracking-wide">Love in little things</p>
              </div>              
            </div>
            <nav className="text-2xl font-bold space-x-4 hidden md:flex">
              <a href="/" className="hover:underline">Glówna</a>
              <a href="/productsMain" className="hover:underline">Katalog wyrobów</a>
              <a href="/about" className="hover:underline">O nas</a>
            </nav>

            {/* Social Media Links */}
            <div>
              <div className="font-medium">
                Kontakty do zamówień
              </div>
              <div  className="hidden flex md:flex backdrop-blur-sm bg-pink-200/20 items-center rounded-md">
                <a
                  href="https://www.facebook.com/larysa.shepetko"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/2023_Facebook_icon.svg.png"
                    alt="Facebook_icon"
                    className="w-10 h-10 rounded-md p-1"
                  />
                </a>
                <a
                  href="https://www.instagram.com/shepetko.larisa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/Instagram.png"
                    alt="Instagram_icon"
                    className="w-10 h-10 rounded-md p-1"
                  />
                </a>
                <a
                  href="https://wa.me/48501577919"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/whatsapp logo.png"
                    alt="whatsapp_icon"
                    className="w-10 h-10 rounded-md p-1"
                  />
                </a>
                <a
                  href="mailto:likashepetko@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/email-icon.svg"
                    alt="email_icon"
                    className="w-10 h-10 rounded-md p-1"
                  />
                </a>
              </div>  
            </div>
            <div className="hidden md:flex items-center space-x-4">
                <a href="#" className="text-bold">Zaloguj</a>
                <span>|</span>
                <a href="#" className="text-bold">Zarejestruj</a>
                <button className="bg-pink-400 p-2 rounded-full">
                  🔍
                </button>
                <button className="bg-pink-500 p-2 rounded-full">
                  🛒
                </button>
              </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-3xl focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {menuOpen && (
            <div className="md:hidden px-4 pb-4 space-y-2 bg-gray-800 text-white">
              <a href="/" className="block hover:underline">Glówna</a>
              <a href="/productsMain" className="block hover:underline">Katalog</a>
              <a href="/about" className="block hover:underline">O nas</a>
              <p>---------------------------</p>
              <a href="/logIn" className="block hover:underline">Zaloguj</a>
              <a href="/signUp" className="block hover:underline">Zarejestruj</a>
            </div>
          )}
        </header>
      ) : (
        // 👇 Інший хедер для всіх інших сторінок
        <header className={headerClass}>
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img
                src={logo}
                alt="logo"
                className="w-10 h-10 rounded-full bg-white p-1"
              />
              <div className="items-center space-x-3">
                <h1 className="text-3xl text-pink-700 font-bold font-dancing tracking-wide">LS STUDIO</h1>
                <p  className="text-pink-700 font-bold font-dancing tracking-wide">Love in little things</p>
              </div>              
            </div> 
              <nav className="space-x-6 text-sm font-semibold uppercase hidden md:flex">
                <a href="/" className="hover:underline">Glówna</a>
                <a href="/productsMain" className="hover:underline">Katalog wyrobów</a>
                <a href="/about" className="hover:underline">O nas</a>
              </nav>

              {/* Social Media Links */}
              <div>
                <div className="font-medium">
                  Kontakty do zamówień
                </div>
                <div  className="flex md:flex backdrop-blur-sm bg-pink-200/20 items-center rounded-md">
                  <a
                    href="https://www.facebook.com/larysa.shepetko"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/2023_Facebook_icon.svg.png"
                      alt="Facebook_icon"
                      className="w-10 h-10 rounded-md p-1"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/shepetko.larisa"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/Instagram.png"
                      alt="Instagram_icon"
                      className="w-10 h-10 rounded-md p-1"
                    />
                  </a>
                  <a
                    href="https://wa.me/48501577919"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/whatsapp logo.png"
                      alt="whatsapp_icon"
                      className="w-10 h-10 rounded-md p-1"
                    />
                  </a>
                  <a
                    href="mailto:likashepetko@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/email-icon.svg"
                      alt="email_icon"
                      className="w-10 h-10 rounded-md p-1"
                    />
                  </a>
                </div>  
              </div>
              <div className="hidden items-center space-x-4 md:flex">
                <a href="#" className="text-xs">Zaloguj</a>
                <span>|</span>
                <a href="#" className="text-xs">Zarejestruj</a>
                <button className="bg-lime-500 p-2 rounded-full">
                  🔍
                </button>
                <button className="bg-lime-500 p-2 rounded-full">
                  🛒
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-3xl focus:outline-none"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                ☰
              </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {menuOpen && (
            <div className="md:hidden px-4 pb-4 space-y-2 bg-gray-800 text-white">
              <a href="/" className="block hover:underline">Glówna</a>
              <a href="/productsMain" className="block hover:underline">Katalog</a>
              <a href="/about" className="block hover:underline">O nas</a>
              <p>---------------------------</p>
              <a href="/logIn" className="block hover:underline">Zaloguj</a>
              <a href="/signUp" className="block hover:underline">Zarejestruj</a>
            </div>
          )}
        </header>)
      } 
  </>
  );
};

export default Header;