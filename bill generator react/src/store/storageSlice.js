import { createSlice } from "@reduxjs/toolkit";
import defaultBuyerListData from "../store/storage.js";

let storedBuyerListData = [];

try {
  const raw = localStorage.getItem("buyers");
  storedBuyerListData = raw ? JSON.parse(raw) : [];
} catch (e) {
  storedBuyerListData = [];
}

const storageSliceInitialState =
  storedBuyerListData.length > 0
    ? JSON.parse(JSON.stringify(storedBuyerListData))
    : defaultBuyerListData;

const storageSlice = createSlice({
  name: "storage",
  initialState: storageSliceInitialState,
  reducers: {
    handleSaveStorage(state, action) {
      const { currentBuyerData, index, updatedCurrentBuyer } = action.payload;
      if (updatedCurrentBuyer?.buyerName === "") {
        return;
      }
      if (currentBuyerData) {
        state[index] = updatedCurrentBuyer;
      } else {
        state.push(updatedCurrentBuyer);
      }
      localStorage.setItem("buyers", JSON.stringify(state));
    },
    
    handleDelete(state, action) {
      const { updatedState } = action.payload;
      localStorage.setItem("buyers", JSON.stringify(updatedState));
      return updatedState;
    },
  },
});

export default storageSlice;
