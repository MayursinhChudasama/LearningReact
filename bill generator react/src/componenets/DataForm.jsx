import { useState } from "react";
import Input from "./Input";
import Seller from "./Seller";

export default function DataForm() {
  const [inputValues, setInputValues] = useState({
    layoutType: "layout1",
    buyerName: "",
    buyerAddress: "",
    sellerName: "",
    sellerAddress: "",
    invoiceNoPrefix: "",
    invoiceNoStart: "",
    invoiceNoAdd: "",
    dateStart: "",
    total: "",
    noOfParticulars: "",
    data: {
      particulars: [],
      rate: [],
    },
  });

  console.log("inputValues", inputValues);
  function handleChange(event, key, i) {
    if (key === "particulars") {
      setInputValues((prev) => {
        const updatedArray = [...prev.data[key]];
        updatedArray[i] = event.target.value;
        return {
          ...prev,
          data: {
            ...prev.data,
            [key]: updatedArray,
          },
        };
      });
    } else if (key === "rate") {
      setInputValues((prev) => {
        const updatedArray = [...prev.data[key]];
        updatedArray[i] = Number(event.target.value);
        return {
          ...prev,
          data: {
            ...prev.data,
            [key]: updatedArray,
          },
        };
      });
    } else {
      setInputValues((prev) => ({ ...prev, [key]: event.target.value }));
    }
  }
  console.log("inputValues-->", inputValues);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className='p-2 m-2'>
      {/* BUYER DETAILS */}
      <div>
        <Input
          label='Buyer Name'
          id='buyerName'
          onChange={(e) => handleChange(e, "buyerName")}
        />
        <Input
          isAddress
          label='Buyer Address'
          id='buyerAddress'
          onChange={(e) => handleChange(e, "buyerAddress")}
        />
      </div>

      <div>
        <Seller
          num='1'
          inputValues={inputValues}
          setInputValues={setInputValues}
          handleChange={handleChange}
        />
        <Seller
          num='2'
          inputValues={inputValues}
          setInputValues={setInputValues}
          handleChange={handleChange}
        />
        <Seller
          num='3'
          inputValues={inputValues}
          setInputValues={setInputValues}
          handleChange={handleChange}
        />
      </div>
    </form>
  );
}
