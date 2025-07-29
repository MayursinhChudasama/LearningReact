type layoutType = "layout1" | "layout2" | "layout3";

interface data {
  particulars: string[];
  rate: string[];
}

export interface seller {
  layoutType: layoutType;
  name: string;
  address: string;
  total: string;
  invoiceNoPrefix: string;
  invoiceNoStart: string;
  invoiceNoAdd: string;
  dateStart: string;
  noOfParticulars: string;
  data: data;
  invoiceData: singleInvoiceData[];
}

export interface singleInvoiceData {
  no: string;
  date: string;
  particulars: string[];
  qty: number[];
  rate: number[];
  amount: number[];
  totalAmount: number;
}

export interface buyer {
  id: number | string;
  buyerName: string;
  buyerAddress: string;
  type: string;
  seller1: seller;
  seller2: seller;
  seller3: seller;
}
