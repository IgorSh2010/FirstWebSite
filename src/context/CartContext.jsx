import { createContext, useContext, useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  // Підписка на auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  // Слухач Firestore --> Підписка на carts/{uid}
  useEffect(() => {
    if (!user) {
      setCartItems([]);
      return;
    }

    const cartRef = doc(db, "carts", user.uid);
    const unsubscribe = onSnapshot(cartRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (Array.isArray(data.items)) {
          setCartItems(data.items);
        } else {
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const saveCart = async (newItems) => {
    if (!user) return;
    await setDoc(doc(db, "carts", user.uid), {
      items: newItems,
      updatedAt: new Date(),
    });
  };

  const addToCart = (product) => {
    const exists = cartItems.find((item) => item.id === product._id);
    let updated;
    if (exists) {
      updated = cartItems.map((item) =>
        item.id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updated = [
        ...cartItems,
        {
          id: product._id,
          imageUrl: product.imageUrl || product.image, 
          title: product.title,
          price: product.price,
          quantity: 1,
        },
      ];
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

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};
