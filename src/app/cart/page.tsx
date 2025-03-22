"use client";
import { useCart } from "@/app/providers/CartProvider";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between items-center p-2 border-b">
              <div className="flex items-center gap-4">
                {item.image && <img src={item.image} alt={item.name} className="w-16 h-16" />}
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {cartItems.length > 0 && (
        <button
          onClick={clearCart}
          className="bg-gray-800 text-white px-4 py-2 mt-4 rounded"
        >
          Clear Cart
        </button>
      )}
    </div>
  );
};

export default CartPage;
