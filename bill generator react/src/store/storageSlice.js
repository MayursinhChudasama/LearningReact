import { createSlice } from "@reduxjs/toolkit";
import defaultBuyerListData from "../store/storage.js";

const storedBuyerListData = JSON.parse(localStorage.getItem("buyers"));

const storageSliceInitialState = storedBuyerListData || defaultBuyerListData;

const storageSlice = createSlice({
  name: "storage",
  initialState: storageSliceInitialState,
  reducers: {
    handleSave(state, action) {
      const result = confirm("Are you sure?");
      if (result) {
        const { currentBuyerData, index, updatedCurrentBuyer } = action.payload;
        if (currentBuyerData) {
          state[index] = updatedCurrentBuyer;
        } else {
          state.push(updatedCurrentBuyer);
        }
        localStorage.setItem("buyers", JSON.stringify(state));
      }
    },
    handleDelete(state, action) {
      const { updatedState } = action.payload;
      state = updatedState;
      localStorage.setItem("buyers", JSON.stringify(updatedState));
    },
  },
});

export default storageSlice;
