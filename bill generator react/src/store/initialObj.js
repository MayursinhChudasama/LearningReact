const initialObj = {
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
    invoiceData: "",
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
    invoiceData: "",
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
    invoiceData: "",
  },
};

export default initialObj;

async function sendData() {
  const data = await fetch("http://localhost:3001/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(initialObj),
  });
}
// await sendData();
