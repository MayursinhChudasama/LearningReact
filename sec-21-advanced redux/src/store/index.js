import cartShow from "./cartShow";

const { configureStore, createSlice } = require("@reduxjs/toolkit");
const store = configureStore({
  reducer: { cartShow: cartShow.reducer },
});

export default store;
