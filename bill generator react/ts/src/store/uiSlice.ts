import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { saved: false },
  reducers: {
    saveChanges(state, action) {
      state.saved = action.payload;
    },
  },
});

export default uiSlice;
