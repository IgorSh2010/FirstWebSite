import { useState } from "react";
import emailjs from "@emailjs/browser";

const OrderModal = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: `Chcę zamówić: ${product.title}`,
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    } catch (error) {
      setStatus("error");
      console.error("EmailJS Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"> 
      {status === "success" ? (
        <p className="text-green-600">Zamówienie zostało wysłane!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <h3 className="text-lg font-bold">Formularz zamówienia</h3>
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
            name="message"
            placeholder="Dodatkowe informacje"
            className="w-full border p-2 rounded"
            rows={3}
            onChange={handleChange}
          >{`Cześć. Chcę zamówić: ${product.title}`}</textarea>
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
    </div>  
  );
};

export default OrderModal;