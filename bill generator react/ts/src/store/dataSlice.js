import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { invoiceDataFn } from "../utils/invoiceData";


const dataSliceInitialState = { ...initialState };

const dataSlice = createSlice({
  name: "data",
  initialState: dataSliceInitialState,
  reducers: {
    //
    resetState(state, action) {
      Object.assign(state, initialState);
    },
    updateForm(state, action) {
      let { currentBuyerData } = action.payload;
      if (currentBuyerData) {
        state.buyerName = currentBuyerData?.buyerName;
        state.buyerAddress = currentBuyerData?.buyerAddress;
        state.type = currentBuyerData?.type;
        state.seller1 = { ...currentBuyerData.seller1 };
        state.seller2 = { ...currentBuyerData.seller2 };
        state.seller3 = { ...currentBuyerData.seller3 };
      }
    },
    //
    updateField(state, action) {
      let { key, value, i, num } = action.payload;
      //

      if (key === "rate") {
        value = Number(value);
      }
      if (key === "buyerName" || key === "buyerAddress" || key === "type") {
        state[key] = value;
      } else if (key === "particulars" || key === "rate") {
        console.log("ting");
        state[`seller${num}`].data[key][i] = value;
      } else {
        state[`seller${num}`][key] = value;
      }
    },

    saveInvoiceData(state, action) {
      let { inputValues, num } = action.payload;

      let seller = inputValues[`seller${num}`];
      const data = {
        layoutType: seller.layoutType,
        buyerName: inputValues.buyerName,
        buyerAddress: inputValues.buyerAddress,
        sellerName: seller.name,
        sellerAddress: seller.address,
        invoiceNoPrefix: seller.invoiceNoPrefix,
        invoiceNoStart: seller.invoiceNoStart,
        invoiceNoAdd: seller.invoiceNoAdd,
        dateStart: seller.dateStart,
        total: seller.total,
        noOfParticulars: seller.noOfParticulars,
        data: {
          particulars: seller.data.particulars,
          rate: seller.data.rate,
        },
      };
      const invoiceData = invoiceDataFn(data);

      console.log("invoiceData after", invoiceData);
      state[`seller${num}`].invoiceData = invoiceData;
    },
  },
});

export default dataSlice;
