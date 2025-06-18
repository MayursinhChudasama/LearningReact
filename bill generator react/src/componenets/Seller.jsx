import { useState } from "react";
import Input from "./Input";
import generatePDFLayout1 from "../utils/generatePDFLayout1.js";
import generatePDFLayout2 from "../utils/generatePDFLayout2.js";
import generatePDFLayout3 from "../utils/generatePDFLayout3.js";

export default function Seller({ sellerData, num, inputValues, handleChange }) {
  const [hide, setShow] = useState(false);
  function handleParticulars() {
    let noOfParticulars = 0;
    if (inputValues[`seller${num}`].layoutType === "layout1") {
      noOfParticulars = 15;
    } else if (inputValues[`seller${num}`].layoutType === "layout2") {
      noOfParticulars = 12;
    } else if (inputValues[`seller${num}`].layoutType === "layout3") {
      noOfParticulars = 13;
    }
    return noOfParticulars;
  }
  const noOfParticulars = handleParticulars();
  return (
    <section className='py-3 my-2 border-t-2 '>
      <div className='p-2 m-2 text-center text-xl'>
        <span>Seller-{num}</span>
        <button
          onClick={() => {
            setShow((show) => !show);
          }}
          className='p-2 m-2 hover:cursor-pointer text-[#969696]'>
          {hide ? "Hide" : "Show"}
        </button>
      </div>
      {hide && (
        <div>
          <label
            className='p-1 m-1'
            htmlFor='layoutType'>
            Layout-type
          </label>
          <select
            id='layoutType'
            className='bg-[#4A4A4A] text-[#F5F5F5] border-1 border-[#2F2F2F] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 p-1 m-1'
            // value={inputValues?.layoutType}
            onChange={(e) => handleChange(e, "layoutType", "", num)}>
            <option
              value='layout1'
              id='layout1'>
              Layout-1 (15)
            </option>
            <option
              value='layout2'
              id='layout2'>
              Layout-2 (12)
            </option>
            <option
              value='layout3'
              id='layout3'>
              Layout-3 (13)
            </option>
          </select>

          <button
            onClick={() => {
              // if (inputValues.layoutType === "layout1") {
              //   generatePDFLayout1(inputValues);
              // } else if (inputValues.layoutType === "layout2") {
              //   generatePDFLayout2(inputValues);
              // } else if (inputValues.layoutType === "layout3") {
              //   generatePDFLayout3(inputValues);
              // }
              // console.log("inputValues-->", inputValues);
            }}
            className='p-2 m-2 border-1 hover:cursor-pointer'>
            Generate
          </button>

          {/* SELLER DETAILS */}
          <div>
            <Input
              label='Seller Name'
              id='sellerName'
              defaultValue={sellerData?.name}
              onChange={(e) => handleChange(e, "name", "", num)}
            />
            <Input
              isAddress
              label='Seller Address'
              id='sellerAddress'
              defaultValue={sellerData?.address}
              onChange={(e) => handleChange(e, "address", "", num)}
            />
          </div>
          {/* INVOICE */}
          <div>
            <Input
              label='Invoice No Prefix'
              id='invoiceNoPrefix'
              defaultValue={sellerData?.invoiceNoPrefix}
              onChange={(e) => handleChange(e, "invoiceNoPrefix", "", num)}
            />
            <Input
              label='Invoice No Start'
              id='invoiceNoStart'
              defaultValue={sellerData?.invoiceNoStart}
              onChange={(e) => handleChange(e, "invoiceNoStart", "", num)}
            />
            <Input
              label='Invoice No Add'
              id='invoiceNoAdd'
              defaultValue={sellerData?.invoiceNoAdd}
              onChange={(e) => handleChange(e, "invoiceNoAdd", "", num)}
            />
          </div>
          {/* DATE & TOOTAL */}
          <div>
            <Input
              label='Date Start'
              id='dateStart'
              type='date'
              defaultValue={sellerData?.dateStart}
              onChange={(e) => handleChange(e, "dateStart", "", num)}
            />
            <Input
              label='TOTAL'
              id='total'
              defaultValue={sellerData?.total}
              onChange={(e) => handleChange(e, "total", "", num)}
            />
          </div>
          {/* PARTICUARS */}
          <div>
            <Input
              label='No of Particulars'
              id='noOfParticulars'
              // value={Number(inputValues[].noOfParticulars)}
              onChange={(e) => handleChange(e, "noOfParticulars", "", num)}
            />
          </div>
          {Array.from({ length: noOfParticulars || 0 }).map((item, i) => {
            return (
              <div key={i}>
                <label className='p-1 m-1'>{"P-" + Number(i + 1)}</label>
                <input
                  className='bg-[#4A4A4A] text-[#F5F5F5] border-1 border-[#2F2F2F] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 p-1 m-1 w-100'
                  type='text'
                  // value={inputValues.sellerData.particulars[i]}
                  defaultValue={sellerData?.sellerData?.particulars[i]}
                  onChange={(e) => handleChange(e, "particulars", i, num)}
                />

                <label className='p-1 m-1'>Rate</label>
                <input
                  className='bg-[#4A4A4A] text-[#F5F5F5] border-1 border-[#2F2F2F] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 p-1 m-1'
                  type='text'
                  // value={inputValues.sellerData.rate[i]}
                  defaultValue={sellerData?.sellerData?.rate[i]}
                  onChange={(e) => handleChange(e, "rate", i, num)}
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
