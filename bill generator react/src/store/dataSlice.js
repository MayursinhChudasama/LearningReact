import { createSlice } from "@reduxjs/toolkit";
import initialObj from "./initialObj";

const dataSliceInitialState = { ...initialObj };

const dataSlice = createSlice({
  name: "data",
  initialState: dataSliceInitialState,
  reducers: {
    //
    updateField(state, action) {
      let { key, value, i, num } = action.payload;
      if (key === "rate") {
        value = Number(value);
      }
      if (key === "buyerName" || key === "buyerAddress" || key === "type") {
        state[key] = value;
      } else if (key === "particulars" || key === "rate") {
        state[`seller${num}`].data[key][i] = value || 0;
      } else {
        state[`seller${num}`][key] = value;
      }
    },
  },
});

export default dataSlice;
