import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { getUserRole } from "../Utils/roles";

const ProtectedChat = ({ children }) => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      const role = await getUserRole(user.uid);
      if (role === "admin") {
        setAllowed(true);
        return;
      }

      const orderDoc = await getDoc(doc(db, "orders", orderId));
      if (orderDoc.exists() && orderDoc.data().userId === user.uid) {
        setAllowed(true);
      } else {
        setAllowed(false);
      }
    };

    checkAccess();
  }, [user, orderId, navigate]);

  if (allowed === null) return <p className="text-center mt-20">Sprawdzanie dostępu...</p>;
  if (allowed === false) return <p className="text-center mt-20 text-red-500">Brak dostępu do tej rozmowy.</p>;

  return children;
};

export default ProtectedChat;
