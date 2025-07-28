import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import { dataApi } from "./dataApi.ts";
import uiSlice from "./uiSlice";

export const store = configureStore({
  reducer: {
    dataApi: dataApi.reducer,
    data: dataSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dataApi.middleware),
});
