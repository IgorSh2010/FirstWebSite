import { collection, getDocs, doc , updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const snapshot = await getDocs(collection(db, "orders"));
    const allOrders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setOrders(allOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const orderRef = doc(db, "orders", id);
    await updateDoc(orderRef, { status: newStatus });
    fetchOrders(); // Refresh
  };
  
  return (
    <div className="max-w-6xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-xl font-bold text-pink-700 mb-6">Wszystkie zamówienia (Admin)</h1>
      {orders.map(order => (
        <div key={order.id} className="bg-pink-100 p-4 rounded shadow mb-4">
          <p><strong>Data:</strong> {new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}</p>
          <p><strong>Klient:</strong> {order.customerName} ({order.customerEmail})</p>
          <p><strong>Produkt:</strong> {order.productName}</p>
          <p><strong>Cena:</strong> {order.price} zł</p>
          <div className="flex items-center gap-4">
            <span><strong>Status:</strong></span>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order.id, e.target.value)}
              className="border p-1 rounded"
            >
              <option value="oczekujące">⏳ oczekujące</option>
              <option value="zrealizowane">✅ zrealizowane</option>
              <option value="anulowane">❌ anulowane</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
