import React from "react";
import { useContext } from "react";
import { useState } from "react";

export const CartContext = React.createContext();

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("You can't use a useCart outside CartProvider");
  }

  return context;
} //hook useContext

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addNewItem(orderItem) {
    orderItem.id = cart.length + 1;
    setCart([...cart, orderItem]);
  }

  function updateItemQuantity(quantity, id) {
    const newOrderItems = cart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + parseInt(quantity) };
      }

      return item;
    });
    setCart(newOrderItems);
  }

  function deleteItem(id) {
    const newItems = cart.filter((cart) => cart.id !== id);
    setCart(newItems);
  }

  return (
    <CartContext.Provider
      value={{ cart, setCart, addNewItem, updateItemQuantity, deleteItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
