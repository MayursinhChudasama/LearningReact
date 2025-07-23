import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import { dataApi } from "./dataApi.ts";

export const store = configureStore({
  reducer: {
    dataApi: dataApi.reducer,
    data: dataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dataApi.middleware),
});
