import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;
      if (!user) return;
      
      const snapshot = await getDocs(collection(db, "users", user.uid, "orders"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">Moje zamówienia:</h2>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-pink-100 p-4 rounded shadow">
            <p><strong>Produkt:</strong> {order.productName}</p>
            <p><strong>Cena:</strong> {order.price} zł</p>
            <p><strong>Status:</strong> 
            <span className={`ml-2 px-2 py-1 rounded text-sm font-medium ${
              order.status === "oczekujące" ? "bg-yellow-200" :
              order.status === "zrealizowane" ? "bg-green-200" :
              order.status === "anulowane" ? "bg-red-200" : "bg-gray-200"
                  }`}>
              {order.status}
            </span>
          </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;
