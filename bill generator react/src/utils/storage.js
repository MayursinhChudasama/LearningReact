const obj = [
  {
    buyerName: "Mayur Chudasama",
    buyerAddress: "Rajkot",
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
  {
    buyerName: "PDC",
    buyerAddress: "Amdbd",
    seller1: {
      layoutType: "layout1",
      name: "PDC-1",
      address: "PDC-1 Address",
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
      name: "PDC-2",
      address: "PDC-2 Address",
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
      name: "PDC-3",
      address: "PDC-3 Address",
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
  {
    buyerName: "PDC-2",
    buyerAddress: "Amdbd",
    seller1: {
      layoutType: "layout1",
      name: "PDC-1",
      address: "PDC-1 Address",
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
      name: "PDC-2",
      address: "PDC-2 Address",
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
      name: "PDC-3",
      address: "PDC-3 Address",
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
  {
    buyerName: "PDC-3",
    buyerAddress: "Amdbd",
    seller1: {
      layoutType: "layout1",
      name: "PDC-1",
      address: "PDC-1 Address",
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
      name: "PDC-2",
      address: "PDC-2 Address",
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
      name: "PDC-3",
      address: "PDC-3 Address",
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

export function setData() {
  //   let home = getData();
  if (localStorage.length == 0) {
    localStorage.setItem("home", JSON.stringify(obj));
  }
}
export function getData() {
  const data = JSON.parse(localStorage.getItem("home"));
  return data;
}

let num = 1;
let myObj = {};
myObj[`seller${num}`] = "details";
// console.log(myObj);
