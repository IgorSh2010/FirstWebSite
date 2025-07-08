import { useCart } from "../context/CartContext";
import Breadcrumbs from '../components/Breadcrumbs';
import OrderButton  from '../components/OrderButton';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

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
            <div key={item.id} className="flex justify-between items-center mb-2 shadow-lg">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-16 h-16 object-contain rounded mr-4 transition-transform duration-300 transform hover:scale-150"></img>
              <span>{item.title} x {item.quantity}</span>
              <span>{item.price * item.quantity} zł</span>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500">Usuń</button>
            </div>
          ))}
          <hr className="my-4" />
          <p><strong>Suma:</strong> {total} zł</p>

          <OrderButton products={cartItems} onOrderComplete={clearCart} />
        </>
      )}
    </div>
   </> 
  );
};

export default CartPage;
