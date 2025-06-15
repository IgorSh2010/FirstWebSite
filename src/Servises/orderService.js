import { collection, addDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export const createOrder = async (orderData, product = null) => {
  const user = auth.currentUser;

  const fullOrder = {
    userId: user?.uid || null,
    productId: product?._id || null,
    productName: product?.title || "Nieokreślony",
    price: product?.price || 0,
    ...orderData, 
    status: "W realizacji",
    createdAt: serverTimestamp()
  };

  const orderRef = await addDoc(collection(db, "orders"), fullOrder);

  if (user?.uid) {
    await setDoc(doc(db, "users", user.uid, "orders", orderRef.id), fullOrder);
  }

  return orderRef.id;
};
