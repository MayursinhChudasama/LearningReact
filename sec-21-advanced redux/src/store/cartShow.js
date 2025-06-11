import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = { showCart: true };
const cartShow = createSlice({
  name: "cartShow",
  initialState: cartInitialState,
  reducers: {
    showCart(state) {
      return {
        showCart: !state.showCart,
      };
    },
  },
});
export default cartShow;
