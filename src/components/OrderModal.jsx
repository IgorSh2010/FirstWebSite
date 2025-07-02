import { useState, useEffect } from "react";
import { createOrder } from "../Servises/orderService";
import Modal from "./Modal";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { sendMail } from "../Servises/SendMail"; // Assuming you have a sendMail function

const OrderModal = ({ product = null , onClose }) => {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    notes: "",
  });

  const [modalMessage, setmodalMessage] = useState(false);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user?.uid) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setFormData((prev) => ({
            ...prev,
            name: data.fullName || "",
            email: data.email || "",
          }));
        }
      }
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
        
    try {
      await createOrder(formData, product);
      await sendMail(
        formData.email,
        `Potwierdzenie zamówienia ${product.name}`,
        `Dziękujemy za zamówienie ${product.name}. Skontaktujemy się wkrótce.`,
        );
        setmodalMessage("Twoje zamówienie zostało wysłane i zapisane do bazy!");
    } catch (error) {
        setmodalMessage("Błąd podczas zapisu zamówienia. ", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[9999] pointer-events-auto"> 
      <form onSubmit={handleSubmit} className="space-y-4 text-left z-50 bg-white p-6 rounded shadow max-w-md w-full">
          <h3 className="text-lg text-pink-700 font-bold">Formularz zamówienia</h3>
          <input
            name="name"
            type="text"
            placeholder="Twoje imię"
            className="w-full border p-2 rounded"
            required
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Email kontaktowy"
            className="w-full border p-2 rounded"
            required
            onChange={handleChange}
          />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Dodatkowe informacje, np. adres dostawy, ilość, terminy itp."
            className="w-full border p-2 rounded text-black"
            rows={3}
          ></textarea>
          
          <div className="flex flex-row gap-4">
            <button
                type="submit"
                className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 w-full" 
                onClick= {(e) => {e.stopPropagation(); e.preventDefault(); handleSubmit(e);} }              
            >
                Wyślij zamówienie
            </button>
            <button onClick= {(e) => {e.stopPropagation(); e.preventDefault(); onClose()}} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 w-full">
                Zamknij
            </button> 
          </div>
        </form>

      {modalMessage && (
        <Modal
          message={modalMessage}
          onClose={() => setmodalMessage("")}
          onConfirm={() => {setmodalMessage(""); onClose(); }}
          confirmMode={false}
        />
      )}
    </div>  
  );
};

export default OrderModal;