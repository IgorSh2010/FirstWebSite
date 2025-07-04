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
            <div key={order.id} 
            className={`relative flex flex-col md:flex-row p-4 shadow-md rounded-lg hover:shadow-lg transition border-l-4 ${statusColors[order.status] || "border-gray-300 bg-white/70"}`}>
              {order.imageUrl && (
                <div className="flex-shrink-0 w-full md:w-40 h-32 mb-4 md:mb-0">
                  <img
                    src={order.imageUrl}
                    alt={order.productName}
                    className="w-full h-full object-contain rounded"
                  />
                </div>
              )}
              <div className="flex-1 pr-20">
                <p className="font-semibold text-pink-800">
                  Zamówienie: {order.productName}
                </p>                 
                <p><strong>Data:</strong> {new Date(order.createdAt?.seconds * 1000).toLocaleString("pl-PL")}</p>
                <p><strong>Cena:</strong> {order.price} zł</p>
                <p><strong>Uwagi:</strong> {order.notes || "-"}</p>
                <p><strong>Id zamówienia:</strong> {order.id || "-"}</p>
              </div>
                <span className={`absolute rounded-md top-2 right-2 px-2 py-1 text-xs font-bold 
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
                  className="absolute bottom-2 right-2 md:mt-0 bg-pink-600 text-white text-sm px-3 py-1 rounded hover:bg-pink-500 transition">
                    Rozpocznij rozmowę
                </button>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default Orders;