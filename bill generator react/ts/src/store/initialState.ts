import { buyer } from "../Models/buyer";

const initialState: buyer = {
  id: Date.now().toString(),
  buyerName: "",
  buyerAddress: "",
  type: "",
  seller1: {
    layoutType: "layout1",
    name: "",
    address: "",
    total: "",
    invoiceNoPrefix: "",
    invoiceNoStart: "",
    invoiceNoAdd: "",
    dateStart: "",
    noOfParticulars: "",
    data: {
      particulars: [],
      rate: [],
    },
    invoiceData: [],
  },
  seller2: {
    layoutType: "layout2",
    name: "",
    address: "",
    total: "",
    invoiceNoPrefix: "",
    invoiceNoStart: "",
    invoiceNoAdd: "",
    dateStart: "",
    noOfParticulars: "",
    data: {
      particulars: [],
      rate: [],
    },
    invoiceData: [],
  },
  seller3: {
    layoutType: "layout3",
    name: "",
    address: "",
    total: "",
    invoiceNoPrefix: "",
    invoiceNoStart: "",
    invoiceNoAdd: "",
    dateStart: "",
    noOfParticulars: "",
    data: {
      particulars: [],
      rate: [],
    },
    invoiceData: [],
  },
};

export default initialState;
