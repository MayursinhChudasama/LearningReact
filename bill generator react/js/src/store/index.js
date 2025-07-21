import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import storageSlice from "./storageSlice";

const store = configureStore({
  reducer: { storage: storageSlice.reducer, data: dataSlice.reducer },
});

export default store;
