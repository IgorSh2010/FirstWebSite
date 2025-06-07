import { useState, useRef, useEffect } from "react";
import OrderModal from "./OrderModal";

const OrderButton = ({ product }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Закриття дропдауну при кліку поза межами
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative text-left hidden md:flex items-center space-x-4">
      <button
        onClick={(e) => {e.stopPropagation(); e.preventDefault(); setDropdownOpen(!dropdownOpen)}}
        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-pink-700"
      >
        <span>Zamów</span>
      </button>

      {dropdownOpen && (
        <div className="absolute left-16 mb-40 bg-pink-200 text-gray-700 shadow-lg rounded-md w-56 z-50 border-2 border-pink-800">
          <p className="bg-pink-900 text-white font-bold px-4 py-2 rounded-t">Wybierz sposób zamówienia:</p>
          <ul className="text-sm">
            <li>
              <a
                href="https://m.me/larysa.shepetko"
                target="_blank"
                rel="noreferrer"
                className="block hover:bg-blue-600 hover:text-white px-4 py-2"
              >
                💬 Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/shepetko.larisa"
                target="_blank"
                rel="noreferrer"
                className="block hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white px-4 py-2"
              >
                📸 Instagram
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/48501577919?text=Cześć. Chcę zamówić: ${product.title}`}
                target="_blank"
                rel="noreferrer"
                className="block hover:bg-green-500 hover:text-white px-4 py-2"
              >
                📱 WhatsApp
              </a>
            </li>
            <li>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  setOrderModalOpen(true);
                }}
                className="w-full text-left px-4 py-2 hover:bg-sky-500"
              >
                📧 E-mail
              </button>
            </li>
          </ul>
        </div>
      )}

      {orderModalOpen && (
        <OrderModal
          product={product}
          onClose={() => setOrderModalOpen(false)}
        />
      )}
    </div>
  );
};

export default OrderButton;