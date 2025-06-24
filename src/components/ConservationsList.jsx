import { useEffect, useState, useRef } from "react";
import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../Utils/roles";
import { onAuthStateChanged } from "firebase/auth";

const ConversationsList = () => {
  const [conversations, setConversations] = useState([]);
  const [role, setRole] = useState("user");
  const [user, setUser] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userRole = await getUserRole(currentUser.uid);
        setRole(userRole);

        let q;
        if (role === "admin") {
          q = collection(db, "orders");
        } else {
          q = query(collection(db, "orders"), where("userId", "==", currentUser.uid));
        }

        const unsubscribeSnapshot = onSnapshot(q, async (snapshot) => {
          const items = [];
          for (const docSnap of snapshot.docs) {
            const order = { id: docSnap.id, ...docSnap.data() };

            const messagesSnap = await getDocs(collection(db, "orders", order.id, "messages"));
            const hasUnread = messagesSnap.docs.some(msg => {
              const data = msg.data();
              return role === "admin" ? !data.readByAdmin && data.sender === "user" : !data.readByUser && data.sender === "admin";
            });

            items.push({ ...order, hasUnread });
          }

          items.sort((a, b) => (b.hasUnread ? 1 : 0) - (a.hasUnread ? 1 : 0));
          setConversations(items);
        });

        return () => unsubscribeSnapshot();
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setExpandedId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (user === null) return <p className="p-6 text-center">Musisz być zalogowany, aby zobaczyć rozmowy.</p>;

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto mt-20 p-4 bg-white/50 backdrop-blur-lg rounded shadow">
      {conversations.length === 0 ? (
        <p className="text-gray-600">Brak rozmów.</p>
      ) : (
        <ul className="space-y-3">
          {conversations.map(conv => (
            <li key={conv.id} className="relative">
              <div
                className="flex items-center justify-between bg-pink-100 p-3 rounded shadow hover:shadow-md transition cursor-pointer"
                onClick={() => setExpandedId(expandedId === conv.id ? null : conv.id)}
              >
                <div>
                  <p className="font-semibold">{conv.productName || "Nieokreślony produkt"}</p>
                  <p className="text-sm text-gray-600">Zamówienie: {conv.id}</p>
                </div>
                {conv.hasUnread && <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>}
              </div>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  expandedId === conv.id ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-4 bg-white shadow rounded text-sm">
                  <p><strong>Status:</strong> {conv.status}</p>
                  <p><strong>Uwagi:</strong> {conv.notes || "-"}</p>
                  <button
                    onClick={() => navigate(`/chat/${conv.id}`)}
                    className="mt-2 bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700"
                  >
                    Przejdź do rozmowy
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConversationsList;
