import { useEffect, useState, useRef } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

const ChatWindow = ({ orderId, isAdmin = false }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const currentUser = auth.currentUser;

  // Fetch messages in real-time
  useEffect(() => {
    const q = query(
      collection(db, "orders", orderId, "chat"),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [orderId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await addDoc(collection(db, "orders", orderId, "chat"), {
      text: newMessage,
      sender: isAdmin ? "admin" : currentUser?.uid || "guest",
      timestamp: serverTimestamp(),
      read: false,
    });

    setNewMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 border-b bg-pink-100 font-bold text-pink-700">🗨️ Czat z klientem</div>

      <div className="p-4 h-72 overflow-y-auto space-y-2 bg-gray-50">
        {messages.length === 0 && (
          <p className="text-gray-500 text-sm">Brak wiadomości</p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded-lg max-w-[70%] ${
              msg.sender === (isAdmin ? "admin" : currentUser?.uid)
                ? "bg-pink-200 self-end ml-auto"
                : "bg-gray-200"
            }`}
          >
            <p className="text-sm">{msg.text}</p>
            <p className="text-xs text-right text-gray-500 mt-1">
              {msg.timestamp?.seconds
                ? new Date(msg.timestamp.seconds * 1000).toLocaleString()
                : ""}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="p-4 border-t flex gap-2 bg-white"
      >
        <input
          type="text"
          placeholder="Napisz wiadomość..."
          className="flex-1 border p-2 rounded"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          Wyślij
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
