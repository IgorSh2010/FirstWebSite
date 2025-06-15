import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
        const ordersRef = collection(db, "users", currentUser.uid, "orders");
        const snapshot = await getDocs(ordersRef);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(data);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="text-center text-gray-600 py-20">
        Ładowanie zamówień...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-20 bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-3xl font-bold text-pink-700 mb-6 text-center">
        Historia zamówień
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">Brak zamówień.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-pink-100 p-4 rounded shadow-md">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-pink-800">
                  Zamówienie: {order.productName}
                </p>
                <span className={`px-3 py-1 rounded text-xs font-bold 
                  ${order.status === "Zrealizowane" ? "bg-green-500 text-white" :
                    order.status === "W realizacji" ? "bg-yellow-400 text-black" :
                    "bg-red-400 text-white"}`}>
                  {order.status}
                </span>
              </div>

              <p><strong>Data:</strong> {new Date(order.date).toLocaleDateString()}</p>
              <p><strong>Cena:</strong> {order.price} zł</p>
              <p><strong>Uwagi:</strong> {order.notes || "-"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;