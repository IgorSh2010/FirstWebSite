import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ArrowDownUp, Pencil } from "lucide-react";
import ChatWindow from "./ChatWindow";

const statusColors = {
  "Nowe": "bg-yellow-100 border-yellow-400",
  "oczekujące na opłatę": "bg-orange-100 border-orange-400",
  "opłacone, w realizacji": "bg-blue-100 border-blue-400",
  "wysłane": "bg-purple-100 border-purple-400",
  "zrealizowane": "bg-green-100 border-green-400",
  "anulowane": "bg-red-100 border-red-400",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [sortDesc, setSortDesc] = useState(true);

  const fetchOrders = async () => {
    const snapshot = await getDocs(collection(db, "orders"));
    const allOrders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setOrders(allOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, userId, newStatus) => {
    const orderRef = doc(db, "orders", id);
    const orderUserRef = doc(db, "users", userId, "userOrders", id);
    await updateDoc(orderRef, { status: newStatus });
    await updateDoc(orderUserRef, { status: newStatus });
    fetchOrders();
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (!a.createdAt || !b.createdAt) return 0;
    return sortDesc
      ? b.createdAt.seconds - a.createdAt.seconds
      : a.createdAt.seconds - b.createdAt.seconds;
  });

  return (
    <div className="max-w-6xl mx-auto mt-24 p-6 bg-white/50 backdrop-blur-md shadow-xl rounded-xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-pink-700">📦 Panel zamówień (Admin)</h1>
        <button
          onClick={() => setSortDesc(!sortDesc)}
          className="flex items-center gap-2 text-sm font-bold text-pink-700 hover:text-pink-900"
        >
          Sortuj po dacie <ArrowDownUp size={18} />
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">Brak zamówień.</p>
      ) : (
        <div className="space-y-6">
          {sortedOrders.map(order => (
            <div
              key={order.id}
              className={`flex flex-col md:flex-row p-4 shadow-md rounded-lg hover:shadow-lg transition border-l-4 ${statusColors[order.status] || "border-gray-300 bg-white/70"}`}
            >
              {order.imageUrl && (
                <div className="flex-shrink-0 w-full md:w-40 h-32 mb-4 md:mb-0">
                  <img
                    src={order.imageUrl}
                    alt={order.productName}
                    className="w-full h-full object-contain rounded"
                  />
                </div>
              )}

              <div className="flex-1 md:ml-6 space-y-1 text-sm text-gray-800">
                <p><strong className="text-pink-700">📅 Data:</strong> {new Date(order.createdAt?.seconds * 1000).toLocaleString("pl-PL")}</p>
                <p><strong className="text-pink-700">🆔 ID:</strong> {order.id}</p>
                <p><strong className="text-pink-700">👤 Klient:</strong> {order.name} ({order.email})</p>
                <p><strong className="text-pink-700">👤 Nr telefonu:</strong> {order.userPhone}</p>
                <p><strong className="text-pink-700">🎁 Produkt:</strong> {order.productName}</p>
                <p><strong className="text-pink-700">💰 Cena:</strong> {order.price} zł</p>
                <p><strong className="text-pink-700">📝 Uwagi:</strong> {order.notes}</p>
              </div>

              <div className="flex flex-col justify-between items-start md:items-end md:ml-6 mt-4 md:mt-0">
                <label className="font-semibold mb-2 flex items-center gap-2">
                  <Pencil size={16} className="text-pink-700" /> Status:
                </label>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, order.userId, e.target.value)}
                  className="border border-pink-300 p-2 rounded bg-white hover:bg-pink-50 transition"
                >
                  <option value="Nowe">📜 Nowe</option>
                  <option value="oczekujące na opłatę">⏳ oczekujące na opłatę</option>
                  <option value="opłacone, w realizacji">📌 opłacone, w realizacji</option>
                  <option value="wysłane">🚀 wysłane</option>
                  <option value="zrealizowane">✅ zrealizowane</option>
                  <option value="anulowane">❌ anulowane</option>
                </select>
                {/*//<button
                // onClick={() => }
                 // className="flex items-center gap-2 text-sm font-bold text-pink-700 hover:text-pink-900"
                //>
                //</div>  Sortuj po dacie <ArrowDownUp size={18} />
                //</div></button>*/}
                <ChatWindow orderId={order.id} isAdmin />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
