import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = [];
const cartStore = createSlice({
  name: "cartStore",
  initialState: cartInitialState,
  reducers: {
    increaseQty(state, product) {
      const existingItemIndex = state.findIndex(
        (item) => item.title === product.payload.title
      );
      const existingItem = state[existingItemIndex];
      if (existingItem) {
        const updatedProduct = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
          //   total: updatedProduct.price * updatedProduct.quantity,
        };
        const total = updatedProduct.price * updatedProduct.quantity;
        updatedProduct.total = total;
        const updatedCart = [...state];
        updatedCart[existingItemIndex] = updatedProduct;
        return updatedCart;
      } else {
        const total = product.payload.price * product.payload.quantity;
        product.payload.total = total;
        return [...state, product.payload];
      }
    },
    decreaseQty(state, item) {
      const product = item.payload;
      const existingItemIndex = state.findIndex(
        (pro) => pro.title === product.title
      );
      const existingItem = state[existingItemIndex];
      if (product.quantity == 1) {
        console.log(" ==1 works");

        const updatedCart = state.filter((item) => item.title != product.title);
        return updatedCart;
      } else {
        console.log(" else works");

        const updatedProduct = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
          //   total: updatedProduct.price * updatedProduct.quantity,
        };
        const total = updatedProduct.price * updatedProduct.quantity;
        updatedProduct.total = total;
        const updatedCart = [...state];
        updatedCart[existingItemIndex] = updatedProduct;
        return updatedCart;
      }
    },
  },
});
export default cartStore;
