import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-pink-700 mb-6">Wszystkie zamówienia (Admin)</h1>
      {orders.map(order => (
        <div key={order.id} className="bg-pink-100 p-4 rounded shadow mb-4">
          <p><strong>Data:</strong> {new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}</p>
          <p><strong>Klient:</strong> {order.customerName} ({order.customerEmail})</p>
          <p><strong>Produkt:</strong> {order.productName}</p>
          <p><strong>Cena:</strong> {order.price} zł</p>
          <p><strong>Status:</strong> {order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
