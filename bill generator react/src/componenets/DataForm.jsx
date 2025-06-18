import { useState } from "react";
import Input from "./Input";
import Seller from "./Seller";
import { useNavigate, useParams } from "react-router";
import { getData } from "../utils/storage";
import initialObj from "../utils/initialObj";

export default function DataForm() {
  const params = useParams();
  let allData = getData();
  const isAlready = allData.find(
    (buyer) => buyer.buyerName == params?.buyerName
  );
  const [inputValues, setInputValues] = useState(isAlready || initialObj);
  const navigate = useNavigate();
  //
  const data = allData.filter(
    (buyer) => buyer.buyerName == params?.buyerName
  )[0];
  //
  function handleDelete() {
    const result = confirm("Are you sure?");
    if (result) {
      let home = getData().filter(
        (buyer) => buyer.buyerName !== params?.buyerName
      );
      console.log(home);
      localStorage.setItem("home", JSON.stringify(home));
      navigate("..");
    }
  }
  // handleSave
  function handleSave() {
    const result = confirm("Are you sure?");
    if (result) {
      let data = [...getData()];
      if (isAlready) {
        const index = data.findIndex(
          (buyer) => buyer.buyerName == params?.buyerName
        );
        data[index] = { ...inputValues };
      } else {
        data.push(inputValues);
      }
      localStorage.setItem("home", JSON.stringify(data));
      navigate("..");
    }
  }
  // handleChange
  function handleChange(event, key, i, num) {
    let value = event.target.value;
    if (key === "rate") {
      value = Number(event.target.value);
    }
    if (key === "buyerName" || key === "buyerAddress") {
      setInputValues((prev) => {
        return {
          ...prev,
          [key]: value,
        };
      });
    } else if (key === "particulars" || key === "rate") {
      console.log("working parti/rates");
      setInputValues((prev) => {
        const updatedArray = [...prev[`seller${num}`].data[key]];
        updatedArray[i] = value;
        return {
          ...prev,
          [`seller${num}`]: {
            ...prev[`seller${num}`],

            data: {
              ...prev[`seller${num}`].data,
              [key]: updatedArray,
            },
          },
        };
      });
    } else {
      console.log("working else");
      setInputValues((prev) => {
        return {
          ...prev,
          [`seller${num}`]: {
            ...prev[`seller${num}`],
            [key]: value,
          },
        };
      });
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
          defaultValue={data?.buyerName}
          // value={inputValues.buyerName}
          onChange={(e) => handleChange(e, "buyerName")}
        />
        <Input
          isAddress
          label='Buyer Address'
          id='buyerAddress'
          defaultValue={data?.buyerAddress}
          // value={inputValues.buyerAddress}
          onChange={(e) => handleChange(e, "buyerAddress")}
        />
        <div className='m-1 p-1'>
          <Input
            isAddress
            label='Type'
            id='type'
            defaultValue={data?.type}
            onChange={(e) => handleChange(e, "type")}
          />
          <button
            className='mx-20 text-2xl hover:cursor-pointer'
            onClick={handleSave}>
            {params.buyerName ? "📝" : "💾"}
          </button>
          {params.buyerName && (
            <button
              className='mx-20 text-2xl hover:cursor-pointer'
              onClick={handleDelete}>
              🗑️
            </button>
          )}
        </div>
      </div>
      <div>
        <Seller
          num='1'
          sellerData={data?.seller1}
          inputValues={inputValues}
          setInputValues={setInputValues}
          handleChange={handleChange}
        />
        <Seller
          num='2'
          sellerData={data?.seller2}
          inputValues={inputValues}
          setInputValues={setInputValues}
          handleChange={handleChange}
        />
        <Seller
          num='3'
          sellerData={data?.seller3}
          inputValues={inputValues}
          setInputValues={setInputValues}
          handleChange={handleChange}
        />
      </div>
    </form>
  );
}
