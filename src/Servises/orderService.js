import { collection, addDoc, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export const createOrder = async (orderData, product = null) => {
 try {
  const user = auth.currentUser;
  let userPhone = "";

  if (user?.uid) {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      userPhone = userDoc.data().phone || "";
    }
  }
  
  const fullOrder = {
    userId: user.uid,
    userPhone: userPhone,
    imageUrl: product?.imageUrl || null,
    productId: product?._id || null,
    productName: product?.title || "Nieokreślony",
    price: product?.price || 0,
    ...orderData, 
    status: "Nowe",
    createdAt: serverTimestamp()
  };

  const orderRefGl = await addDoc(collection(db, "orders"), fullOrder);
  //console.log("Order added with ID:", orderRefGl.id);

  //if (user?.uid) {
   const orderRefUser = await setDoc(doc(db, "users", user.uid, "userOrders", orderRefGl.id || product), fullOrder);
  //   console.log("Order also written to user collection");
  //}

  return orderRefUser;
  } catch (error) {
      console.error("❌ Failed to create order:", error);
    throw error;
  }
};
