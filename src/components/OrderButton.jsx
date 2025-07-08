import { useState } from "react";
import OrderModal from "./OrderModal";

const OrderButton = ({ products, onOrderComplete }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 mt-4"
      >
        Zamów
      </button>

      {open && (
        <OrderModal
          products={products}
          onClose={() => setOpen(false)}
          onSuccess={() => {
            setOpen(false);
            if (onOrderComplete) onOrderComplete();
          }}
        />
      )}
    </>
  );
};

export default OrderButton;
