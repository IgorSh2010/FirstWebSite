import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const getUserRole = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();
    return data.role || "user"; // за замовчуванням user
  } else {
    return "user";
  }
};
