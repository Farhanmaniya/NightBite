import { createContext, useState, useContext, useEffect } from "react";

// 1. Create the context
const CartContext = createContext();

// 2. Create the provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("nightbite_cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("nightbite_cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Error saving cart to localStorage", e);
    }
  }, [cartItems]);

  // 1. Add to cart
  const addToCart = (item) => {
    setCartItems((prev) => {
      //Check if item already exists in cart
      const exists = prev.find((i) => i._id === item._id);
      if (exists) {
        // If yes -> just increase quality
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }

      // If no -> add new item with quantity 1
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // 2. Remove from cart
  const removeFromCart = (_id) => {
    setCartItems((prev) => prev.filter((i) => i._id !== _id));
  };

  // 3. Update quantity
  const updateQuantity = (id, amount) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i._id === id ? { ...i, quantity: i.quantity + amount } : i,
        )
        .filter((i) => i.quantity > 0),
    );
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
