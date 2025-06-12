import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = { showCart: true, notification: null };
const cartShow = createSlice({
  name: "cartShow",
  initialState: cartInitialState,
  reducers: {
    showCart(state) {
      return {
        ...state,
        showCart: !state.showCart,
      };
    },
    showNotification(state, action) {
      return {
        ...state,
        notification: {
          status: action.payload.status,
          title: action.payload.title,
          message: action.payload.message,
        },
      };
    },
  },
});
export default cartShow;
