import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";

import PropTypes from "prop-types";

export const CartContext = React.createContext();

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("You can't use a useCart outside CartProvider");
  }

  return context;
} //hook useContext

function CartProvider({ children }) {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("myCart")) || []
  );

  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(cart));
  }, [cart]);

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
  const totalCartItem = cart.reduce(
    (total, cartItem) => (total = total + cartItem.quantity),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        totalCartItem,
        setCart,
        addNewItem,
        updateItemQuantity,
        deleteItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;
