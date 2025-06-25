import { useState, useRef } from "react";
import OrderModal from "./OrderModal";

const OrderButton = ({ product }) => {
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <div ref={dropdownRef} className="relative text-left flex items-center space-x-4">
      <button
        onClick={(e) => {e.stopPropagation(); e.preventDefault(); setOrderModalOpen(true)}}
        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-pink-700 text-sm md:text-base"
      >
        <span>Zamów</span>
      </button>

      {orderModalOpen && (
        <OrderModal
          product={product}
          onClose={() => setOrderModalOpen(false)}
        />
      )}
    </div>
  );
};

export default OrderButton;