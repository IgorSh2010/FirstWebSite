import { useState } from "react";
import emailjs from "@emailjs/browser";
import { createOrder } from "../Servises/orderService"; // Adjust the import path as necessary
import Modal from "./Modal"; // Assuming you have a Modal component for displaying the order form

const OrderModal = ({ product = null , onClose }) => {
  const productTitle = product ? product.title : '';
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: `Chcę zamówić: ${productTitle}`,
  });

  const [status, setStatus] = useState(null);
  const [modalMessage, setmodalMessage] = useState(true);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createOrder(formData, product);
    setmodalMessage("Twoje zamówienie zostało zapisane!");
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setTimeout(() => {
        onClose();
      }, 2000); // Close modal after 2 seconds
    } catch (error) {
      setStatus("error");
      setmodalMessage("EmailJS Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[9999] pointer-events-auto"> 
      {status === "success" ? (
        <p className="text-green-600">Zamówienie zostało wysłane!</p>
      ) : (
        <form onSubmit={handleSubmit} onClick={(e) => { e.preventDefault(); }} className="space-y-4 text-left z-50">
          <h3 className="text-lg text-white font-bold">Formularz zamówienia</h3>
          <input
            name="name"
            type="text"
            placeholder="Twoje imię"
            className="w-full border p-2 rounded"
            required
            onChange={handleChange}
            onClick={(e) => { e.preventDefault(); }}
          />
          <input
            name="email"
            type="email"
            placeholder="Email kontaktowy"
            className="w-full border p-2 rounded"
            required
            onChange={handleChange}
            onClick={(e) => { e.preventDefault(); }}
          />
          <textarea
            name="notes"
            placeholder="Dodatkowe informacje"
            className="w-full border p-2 rounded text-black"
            rows={3}
            onChange={handleChange}
            onClick={(e) => { e.preventDefault(); }}
          >{`Cześć. Chcę zamówić: ${productTitle}`}</textarea>
          <div className="flex flex-row gap-4">
            <button
                type="submit"
                className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 w-full"
            >
                Wyślij zamówienie
            </button>
            <button onClick={onClose} className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 w-full">
                Zamknij
            </button> 
          </div>
          {status === "error" && <p className="text-red-500">Wystąpił błąd. Spróbuj ponownie.</p>}
        </form>
      )}

      {modalMessage && (
        <Modal
          message={modalMessage}
          onClose={() => setmodalMessage("")}
          onConfirm={() => setmodalMessage("")}
          confirmMode={false}
        />
      )}
    </div>  
  );
};

export default OrderModal;