import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import classNames from "classnames";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import OrderModal from "./OrderModal";
import CartPreview from "./CartPreview";
import { getUserRole } from "../Utils/roles";
import { Speech, UserRound, Heart, LogOut, NotebookTabs, MessageCircle } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = location.pathname === "/";
  const logo = "/LogoLS1.png";
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
          const fetchedRole = await getUserRole(currentUser.uid);
          setUser(currentUser);
          setUserRole(fetchedRole);
        } else {
          setUser(null);
          setUserRole("user");
        }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
  const handleOutsideClick = (e) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };
  if (menuOpen) {
    document.addEventListener("mousedown", handleOutsideClick);
  } else {
    document.removeEventListener("mousedown", handleOutsideClick);
  }
  return () => document.removeEventListener("mousedown", handleOutsideClick);
}, [menuOpen]);

  const headerClass = classNames(
    "shadow-md transition-all duration-800 ease-in-out z-50",
    {
      "px-6 py-4 bg-cover bg-center w-full":
        isHome && !scrolled,
      "fixed top-0 pb-3 w-full bg-gray-900 text-white": scrolled || !isHome,
    }
  );

  useEffect(() => {
    if (!user) {
      setUnreadCount(0);
    return;
   }

    const q = collection(db, "orders");
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const unreadCounts = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const messagesSnap = await getDocs(collection(db, "orders", docSnap.id, "messages"));
          return messagesSnap.docs.reduce((count, msg) => {
            const data = msg.data();
            return count + (!data.readByUser || !data.readByAdmin ? 1 : 0);
          }, 0);
        })
      );
      setUnreadCount(unreadCounts.reduce((a, b) => a + b, 0));
    });

  return () => unsubscribe();
  }, [user]);

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
        <Link to={`/`}>
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
        </Link>

        {/* Навігація (desktop) */}
        <nav className="hidden md:flex space-x-6 text-xl font-semibold uppercase">
          <a href="/" className="hover:underline">
            Glówna
          </a>
          <a href="/productsMain" className="hover:underline">
            Katalog wyrobów
          </a>
          {user ? (
            <a href="/account" className="hover:underline">
              Konto
            </a>
          ) : ("")
          }  
          <a href="/about" className="hover:underline">
            O nas
          </a>
        </nav>

        {/* Контакти */}
        <div className="text-center md:text-right">
          <div className="flex md:mb-auto space-x-4 gap-2 md:items-end md:text-right">            
            <div className="flex flex-row flex-wrap md:flex-row gap-2 items-end md:justify-end">
                <a
                href="https://www.facebook.com/larysa.shepetko"
                target="_blank"
                rel="noopener noreferrer"
                >
                <img src="/2023_Facebook_icon.svg.png" alt="Facebook" title="Polub nas na Facebook" className="w-7 h-7" />
                </a>
                <a
                href="https://www.instagram.com/shepetko.larisa"
                target="_blank"
                rel="noopener noreferrer"
                >
                <img src="/Instagram.png" alt="Instagram" title="Śledź nas na Instagram" className="w-7 h-7" />
                </a>
                <a
                href="https://wa.me/48501577919"
                target="_blank"
                rel="noopener noreferrer"
                >
                <img src="/whatsapp logo.png" alt="WhatsApp" title="Napisz na WhatsApp" className="w-7 h-7" />
                </a>
                <a
                href="/#"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => { e.preventDefault();
                                  setOrderModalOpen(true); }}
                >
                <img src="/email-icon.svg" alt="Email" title="Napisz na e-mail" className="w-7 h-7" />
                </a>
            </div>

            {userRole === "admin" && (
            <a href="/admin/orders" className=" bg-gray-700  hover:bg-gray-400 px-3 py-1 rounded text-white hover:text-pink-700 font-bold">⚙ Admin Panel</a>
            )}

            {/* Кнопка кошика */}
            {user ? (
              <div className="relative">
                <CartPreview />
              </div>
            ) : ("")} 

            {/* Кнопка мобільного меню */}
            <button
              className="md:hidden text-3xl focus:outline-none md:mr-0"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>            
          </div>
        </div>

        {/* Додаткові кнопки */}
        {user ? (
          <div ref={dropdownRef} className="relative hidden md:flex items-center space-x-4">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 bg-pink-500 px-3 py-1 rounded hover:bg-pink-700"
            >
              <span>{user.email.split("@")[0]}</span>
              <span>▼</span>
              {unreadCount > 0 &&
                <div>               
                  <span className="absolute -right-2 -top-2 w-5 h-5 bg-red-500 rounded-full animate-ping opacity-60"></span>
                  <span className="absolute -right-1 -top-1 w-3 h-3 bg-red-600 rounded-full"></span>
                </div>
              }
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white text-gray-700 shadow-lg rounded-md w-56 z-50 border border-pink-200">
                <div className="px-4 py-3 border-b border-pink-100">
                  <p className="font-bold text-pink-700">{user.email}</p>
                </div>
                <ul className="text-sm">
                  <li>
                    <a href="/account" className="flex items-center gap-1 w-full px-4 py-2 hover:bg-pink-100">
                    <UserRound size={16} color="black"/>Moje konto</a>
                  </li>
                  <li>
                    <a href="/favorites" className="flex items-center gap-1 w-full px-4 py-2 hover:bg-pink-100">
                    <Heart size={16} color="red"/>Ulubione</a>
                  </li>
                  <li>
                    <a href="/orders" className="flex items-center gap-1 w-full px-4 py-2 hover:bg-pink-100">
                    <NotebookTabs size={16} color="green"/>Moje zamówienia</a>
                  </li>
                  <li> 
                    <a href="/conservations" className="relative flex items-center gap-2 w-full px-4 py-2 hover:bg-pink-100"> 
                      <Speech size={16} color="blue" /> Moje rozmowy 
                          {unreadCount > 0 && 
                             (<span className="absolute right-4 content-between bg-red-600 text-white text-sm font-bold shadow-lg rounded-xl w-8 h-8 flex items-center justify-center animate-pulse"> 
                                <MessageCircle size={16}/> {unreadCount} 
                              </span> )} 
                    </a> 
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1 w-full text-left px-4 py-2 hover:bg-pink-100"
                    >
                      <LogOut size={16} color="gray"/> Wyloguj się
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-4">
            <a href="/login" className="font-semibold">
              Zaloguj
            </a>
            <span>|</span>
            <a href="/Register" className="font-semibold">
              Zarejestruj
            </a>
          </div>
        )}

        {orderModalOpen && (
        <OrderModal
          product = { null } 
          onClose={() => setOrderModalOpen(false)}
        />
          )}
      </div>

      {/* Мобільне меню */}
      {menuOpen && (
        <div ref={mobileMenuRef} className="md:hidden px-4 pb-4 bg-gray-800 text-white text-center mt-2 rounded-md">
          <div className="flex pt-2 justify-center gap-7 w-full items-center">
            <a href="/" className="hover:underline">
              Glówna
            </a>
            <a href="/productsMain" className="hover:underline">
              Katalog
            </a>
            <a href="/about" className="hover:underline">
              O nas
            </a>
          </div>
          <hr className="my-2 border-gray-600" />
          {user ? (
            <div className="text-white space-y-2">
              <p className="font-bold">{user.email}</p>
              <a href="/account" className="flex items-center justify-center gap-1 w-full hover:underline"><UserRound size={16}/>Moje konto</a>
              <a href="/favorites" className="flex items-center justify-center gap-1 w-full hover:underline"><Heart size={16}/>Ulubione</a>
              <a href="/orders" className="flex items-center justify-center gap-1 w-full hover:underline"><NotebookTabs size={16}/>Moje zamówienia</a>
              <a href="/conservations" className="relative flex items-center justify-center gap-1 w-full hover:underline">
                <Speech size={16}/>Moje rozmowy
                      {unreadCount > 0 && ( 
                        <span className="absolute right-4 content-between bg-red-600 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center animate-pulse">
                           <MessageCircle size={16}/>{unreadCount} 
                        </span> 
                      )}
              </a>
              <button
                onClick={handleLogout}
                className="flex text-rose-700 font-semibold items-center justify-center gap-1 w-full text-left hover:underline"
              >
                <LogOut size={16} />Wyloguj się
              </button>
            </div>
          ) : (
            <div className="my-2 space-y-2">
              <a href="/login" className="my-2 block hover:underline">Zaloguj</a>
              <a href="/register" className="my-2 block hover:underline">Zarejestruj</a>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
