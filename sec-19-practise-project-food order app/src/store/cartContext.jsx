import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});
function cartReducer(state, action) {
  // ADD_ITEM
  if (action.type === "ADD_ITEM") {
    let updatedItems = [...state.items];
    let existingItemIndex = updatedItems
      //   .map((item) => item.id)
      .findIndex((item) => item.id === action.item.id);
    let existingItem = updatedItems[existingItemIndex];

    if (existingItem) {
      const toUpdateItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingItemIndex] = toUpdateItem;
    } else {
      action.item = { ...action.item, quantity: 1 };
      updatedItems = [...state.items, action.item];
    }

    return {
      items: updatedItems,
    };
  }
  // REMOVE_ITEM
  if (action.type === "REMOVE_ITEM") {
    let updatedItems = [...state.items];
    let existingItemIndex = updatedItems.findIndex(
      (item) => item.id === action.id
    );
    let existingItem = updatedItems[existingItemIndex];
    if (existingItem.quantity === 1) {
      updatedItems.splice(existingItemIndex, 1);
      return {
        items: updatedItems,
      };
    } else {
      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      return {
        items: updatedItems,
      };
    }
  }
  return state;
}
export default function CartProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    items: [],
  });
  console.log("cartState", cartState);

  function handleAddItem(item) {
    cartDispatch({
      type: "ADD_ITEM",
      item,
    });
  }
  function handleRemoveItem(id) {
    cartDispatch({
      type: "REMOVE_ITEM",
      id,
    });
  }
  const cartCtx = {
    items: cartState.items,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
  };
  return (
    <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
  );
}
