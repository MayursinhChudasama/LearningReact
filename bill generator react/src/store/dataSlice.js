import { createSlice } from "@reduxjs/toolkit";
import initialObj from "./initialObj";
import { invoiceDataFn } from "../utils/invoiceData";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

// const storedBuyerListData = useSelector((store) => store.storage);
// const params = useParams();
// const currentBuyerData = storedBuyerListData.find(
//   (buyer) => buyer.buyerName == params?.buyerName
// );
// console.log(currentBuyerData);

const dataSliceInitialState = { ...initialObj };

const dataSlice = createSlice({
  name: "data",
  initialState: dataSliceInitialState,
  reducers: {
    //
    updateField(state, action) {
      let { key, value, i, num, currentBuyerData } = action.payload;
      console.log("currentBuyerData", currentBuyerData);
      //
      if (currentBuyerData) {
        state.buyerName = currentBuyerData.buyerName;
        state.buyerAddress = currentBuyerData.buyerAddress;
        state.seller1 = currentBuyerData.seller1;
        state.seller2 = currentBuyerData.seller2;
        state.seller3 = currentBuyerData.seller3;
      }
      //
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
    updateCurrentBuyer(state, action) {
      const currentBuyerData = action.payload;
      state = { ...currentBuyerData };
    },
    saveInvoiceData(state, action) {
      const { inputValues, seller } = action.payload;
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
      state.invoiceData = invoiceData;
    },
  },
});

export default dataSlice;
