"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Cargar carrito desde el almacenamiento local al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("thalys_cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Guardar en almacenamiento local cada vez que cambie
  useEffect(() => {
    localStorage.setItem("thalys_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.productCode === product.productCode
      );
      if (existing) {
        return prev.map((item) =>
          item.productCode === product.productCode
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // --- NUEVA FUNCIÓN PARA RESTAR DE A UNO ---
  const decreaseQuantity = (productCode) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productCode === productCode);

      // Si la cantidad es 1, al restar lo eliminamos por completo
      if (existing && existing.quantity === 1) {
        return prev.filter((item) => item.productCode !== productCode);
      }

      // Si es mayor a 1, restamos 1 a la cantidad
      return prev.map((item) =>
        item.productCode === productCode
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const removeFromCart = (productCode) => {
    setCart((prev) => prev.filter((item) => item.productCode !== productCode));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      // Agregamos decreaseQuantity aquí para que sea accesible desde afuera
      value={{
        cart,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        isCartOpen, openCart, closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
