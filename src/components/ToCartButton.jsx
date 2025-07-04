import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
      <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-pink-700 text-sm md:text-base"
            onClick={() => addToCart(product)}>
        Dodaj do koszyka
      </button>
  );
};
export default ProductCard;