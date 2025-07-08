import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

const CartPreview = () => {
  const location = useLocation();
  const { cartItems, total } = useCart();
  const [open, setOpen] = useState(false);
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false); 

  useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

   const headerClassCart = classNames(
      "relative",
      {
        "text-gray-700 hover:text-gray-500": isHome && !scrolled,
        "text-pink-700 hover:text-pink-500": scrolled || !isHome,
      }
    );

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link to="/cart" className={headerClassCart}>
        <ShoppingCart className={headerClassCart} size={32} />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </Link>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg z-50 p-4">
          <h3 className="font-bold text-pink-700 mb-2">Twój koszyk</h3>
          {cartItems.length === 0 ? (
            <p className="text-sm text-gray-500">Koszyk jest pusty.</p>
          ) : (
            <ul className="text-sm text-black space-y-2 max-h-48 overflow-auto">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-12 h-12 object-cover mr-2"></img>
                  <h6 className="mr-4">{item.title}</h6>
                  <h6 className="mr-4"> x{item.quantity}</h6>
                  <h6 className="mr-1">{item.price}zł.</h6>
                </li>
              ))}
            </ul>
          )}
          {cartItems.length > 0 && (
            <div className="mt-3 text-right">
              <p className="text-sm text-black font-bold">Suma: {total} zł.</p>
              <Link
                to="/cart"
                className="inline-block mt-2 text-sm bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700"
              >
                Do koszyka
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPreview;
