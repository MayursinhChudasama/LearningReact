import { createContext, useReducer } from "react";

const cartContext = createContext({
  items: [],
});
export default function CartProvider() {
    
  return (
    <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
  );
}
