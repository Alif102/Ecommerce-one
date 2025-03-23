"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Define the product type
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string; // Optional image field
}

// Define Cart Context Type
interface CartContextType {
  cartItems: Product[];
  cartCount: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  updateCartItem: (id: number, quantity: number) => void; // Add updateCartItem

}

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider Component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Add to cart function
  const addToCart = (product: Product) => {
    setCartItems((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove from cart function
  const removeFromCart = (id: number) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Clear cart function
  const clearCart = () => {
    setCartItems([]);
  };
  const updateCartItem = (id: number, quantity: number) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };
  
  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount: cartItems.reduce((total, item) => total + item.quantity, 0),
        addToCart,
        removeFromCart,
        clearCart,
        updateCartItem

      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook for easier access
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
