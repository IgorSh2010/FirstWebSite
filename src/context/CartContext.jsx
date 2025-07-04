import { createContext, useContext, useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const user = auth.currentUser;

  // Слухач Firestore
  useEffect(() => {
    if (!user) {
      setCartItems([]);
      return;
    }

    const cartRef = doc(db, "carts", user.uid);

    const unsubscribe = onSnapshot(cartRef, (docSnap) => {
      if (docSnap.exists()) {
        setCartItems(docSnap.data().items || []);
      } else {
        setCartItems([]);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const saveCart = async (newItems) => {
    if (!user) return;
    const cartRef = doc(db, "carts", user.uid);
    await setDoc(cartRef, {
      items: newItems,
      updatedAt: new Date(),
    });
  };

  const addToCart = (product) => {
    const exists = cartItems.find((item) => item.id === product.id);
    let updated;
    if (exists) {
      updated = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updated = [...cartItems, { ...product, quantity: 1 }];
    }
    setCartItems(updated);
    saveCart(updated);
  };

  const removeFromCart = (productId) => {
    const updated = cartItems.filter((item) => item.id !== productId);
    setCartItems(updated);
    saveCart(updated);
  };

  const clearCart = () => {
    setCartItems([]);
    saveCart([]);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};
