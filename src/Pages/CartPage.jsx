import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from '../components/Breadcrumbs';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
    <div className='ml-1'><Breadcrumbs /></div>

    <div className="max-w-5xl mx-auto p-4 bg-white/70 backdrop-blur-md rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Twój koszyk</h2>
      {cartItems.length === 0 ? (
        <p>Koszyk jest pusty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.title} x {item.quantity}</span>
              <span>{item.price * item.quantity} zł</span>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500">Usuń</button>
            </div>
          ))}
          <hr className="my-4" />
          <p><strong>Suma:</strong> {total} zł</p>
          <button
            className="mt-4 bg-pink-600 text-white px-4 py-2 rounded"
            onClick={() => navigate("/checkout")}
          >
            Zamów
          </button>
        </>
      )}
    </div>
   </> 
  );
};

export default CartPage;
