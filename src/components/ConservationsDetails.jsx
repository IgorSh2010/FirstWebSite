import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, addDoc, onSnapshot, serverTimestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { getUserRole } from "../Utils/roles";

const ConversationsDetails = () => {
  const { orderId } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [role, setRole] = useState("user");
  const [order, setOrder] = useState(null);
  const bottomRef = useRef(null);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const fetchOrderAndMessages = async () => {
      const userRole = await getUserRole(user.uid);
      setRole(userRole);

      const orderDoc = await getDoc(doc(db, "orders", orderId));
      if (!orderDoc.exists()) return;

      const orderData = orderDoc.data();
      if (userRole !== "admin" && orderData.userId !== user.uid) {
        alert("Nie masz dostępu do tej rozmowy.");
        return;
      }
      setOrder(orderData);

      const messagesRef = collection(db, "orders", orderId, "messages");
      const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
        const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        msgs.sort((a, b) => a.createdAt?.seconds - b.createdAt?.seconds);
        setMessages(msgs);
        
        // Oznaczenie jako przeczytane
        snapshot.docs.forEach(async (docSnap) => {
        const data = docSnap.data();
        const msgRef = doc(db, "orders", orderId, "messages", docSnap.id);

        if (role === "admin" && !data.readByAdmin && data.sender === "user") {
            await updateDoc(msgRef, { readByAdmin: true });
        }
        if (role === "user" && !data.readByUser && data.sender === "admin") {
            await updateDoc(msgRef, { readByUser: true });
        }
        });
      });

      return () => unsubscribe();
    };

    fetchOrderAndMessages();
  }, [user, orderId, role]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!messageText.trim()) return;

    await addDoc(collection(db, "orders", orderId, "messages"), {
      text: messageText.trim(),
      sender: role,
      createdAt: serverTimestamp(),
      readByUser: role === "user",
      readByAdmin: role === "admin",
    });

    setMessageText("");
  };

  if (!user || !order) return <p className="p-6 text-center">Ładowanie...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-20 p-4 bg-white/50 backdrop-blur-lg rounded shadow flex flex-col h-[70vh]">
      <h1 className="text-xl font-bold text-pink-700 mb-2">Rozmowa o zamówieniu: {order.productName}</h1>

      <div className="flex-1 overflow-y-auto space-y-2 p-2 bg-white rounded shadow-inner">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`max-w-xs p-2 rounded ${
              msg.sender === role ? "bg-pink-200 self-end" : "bg-gray-200 self-start"
            }`}
          >
            <p className="text-sm">{msg.text}</p>
            <p className="text-[10px] text-right text-gray-500">{new Date(msg.createdAt?.seconds * 1000).toLocaleString()}</p>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      <div className="flex mt-4">
        <input
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border p-2 rounded-l focus:outline-pink-500"
          placeholder="Napisz wiadomość..."
        />
        <button
          onClick={sendMessage}
          className="bg-pink-600 text-white px-4 rounded-r hover:bg-pink-700"
        >
          Wyślij
        </button>
      </div>
    </div>
  );
};

export default ConversationsDetails;
