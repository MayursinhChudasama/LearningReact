import cartShow from "./cartShow";
import cartStore from "./cartStore";

const { configureStore, createSlice } = require("@reduxjs/toolkit");
const store = configureStore({
  reducer: { cartShow: cartShow.reducer, cartStore: cartStore.reducer },
});

export default store;
