import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

const Orders = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);
  const statusColors = {
                          "Nowe": "bg-yellow-100 border-yellow-400",
                          "oczekujące na opłatę": "bg-orange-100 border-orange-400",
                          "opłacone, w realizacji": "bg-blue-100 border-blue-400",
                          "wysłane": "bg-purple-100 border-purple-400",
                          "zrealizowane": "bg-green-100 border-green-400",
                          "anulowane": "bg-red-100 border-red-400",
                        };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      const ordersRef = collection(db, "users", user.uid, "userOrders", "");//, "", currentUser.uid
      const snapshot = await getDocs(ordersRef);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
      setLoading(false);
    }
    fetchOrders();
    }, [user]);

  if (loading) {
    return (
      <div className="text-center text-gray-600 py-20">
        Ładowanie zamówień...
      </div>
    );
  }

  return (
    <>
    <div className='ml-1'><Breadcrumbs /></div>

    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-3xl font-bold text-pink-700 mb-6 text-center">
        Historia zamówień
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">Brak zamówień.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div
              key={order.id}
              className={`relative flex flex-col p-4 shadow-md rounded-lg hover:shadow-lg transition border-l-4 ${statusColors[order.status] || "border-gray-300 bg-white/70"}`}
            >
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-pink-800">
                    Zamówienie: {order.id}
                  </p>
                  <p><strong>Data:</strong> {new Date(order.createdAt?.seconds * 1000).toLocaleString("pl-PL")}</p>
                  <p><strong>Cena:</strong> {order.total} zł</p>
                  <p><strong>Uwagi:</strong> {order.notes || "-"}</p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <span className={`rounded-md px-2 py-1 text-xs font-bold mb-2
                    ${order.status === "zrealizowane" ? "bg-green-500 text-white" :
                      order.status === "opłacone, w realizacji" ? "bg-green-200 text-black" :
                      order.status === "Nowe" ? "bg-blue-500 text-white" :
                      order.status === "wysłane" ? "bg-yellow-400 text-black" :
                      order.status === "oczekujące na opłatę" ? "bg-yellow-200 text-black" :
                      order.status === "anulowane" ? "bg-red-200" :
                      "bg-gray-200 text-white"}`}>
                    {order.status}
                  </span>

                  <button
                    onClick={() => navigate(`/chat/${order.id}`)}
                    className="bg-pink-600 text-white text-sm px-3 py-1 rounded hover:bg-pink-500 transition mb-2"
                  >
                    Rozpocznij rozmowę
                  </button>

                  <button
                    onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                    className="text-sm text-pink-700 hover:underline"
                  >
                    {expandedId === order.id ? "Ukryj szczegóły" : "Pokaż szczegóły"}
                  </button>
                </div>
              </div>

              {expandedId === order.id && (
                <div className="mt-4 bg-white p-3 rounded shadow-inner border-t border-pink-200 text-sm">
                  <h4 className="font-bold text-pink-700 mb-2">Produkty:</h4>
                  {order.products?.map((prod, idx) => (
                    <div key={idx} className="flex justify-between border-b py-1">
                      <div>{prod.productName}</div>
                      <div>{prod.quantity} x {prod.price} zł = <strong>{prod.price * prod.quantity} zł</strong></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default Orders;