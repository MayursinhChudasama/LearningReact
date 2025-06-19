const obj = [
  {
    buyerName: "Default",
    buyerAddress: "Default Address",
    seller1: {
      layoutType: "layout1",
      name: "sellerOne",
      address: "sellerOne Address",
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
    },
    seller2: {
      layoutType: "layout2",
      name: "sellerTwo",
      address: "sellerTwo Address",
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
    },
    seller3: {
      layoutType: "layout3",
      name: "sellerThree",
      address: "sellerThree Address",
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
    },
  },
];
export default obj;
export function setData() {
  if (localStorage.length == 0) {
    localStorage.setItem("home", JSON.stringify(obj));
  }
}
export function getData() {
  const data = JSON.parse(localStorage.getItem("home"));
  return data;
}

export function genInvoiceDataObj(data, num) {
  const sellerNum = `seller${num}`;
  console.log("data", data);
  const seller = data[sellerNum];
  console.log("sellerNum", sellerNum);
  return {
    layoutType: "layout1",
    buyerName: data.buyerName,
    buyerAddress: data.buyerAddress,
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
}
