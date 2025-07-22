type layoutType = "layout1" | "layout2" | "layout3";

interface data {
  particulars: string[];
  rate: string[];
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
  buyerName: string;
  buyerAddress: string;
  type: string;
  seller1: {
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
  };
  seller2: {
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
  };
  seller3: {
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
  };
}
