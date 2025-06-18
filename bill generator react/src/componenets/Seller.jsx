import { useState } from "react";
import Input from "./Input";
import generatePDFLayout1 from "../utils/generatePDFLayout1.js";
import generatePDFLayout2 from "../utils/generatePDFLayout2.js";
import generatePDFLayout3 from "../utils/generatePDFLayout3.js";

export default function Seller({ num, inputValues, handleChange }) {
  const [hide, setShow] = useState(false);
  function handleParticulars() {
    let noOfParticulars = 0;
    if (inputValues.layoutType === "layout1") {
      noOfParticulars = 15;
    } else if (inputValues.layoutType === "layout2") {
      noOfParticulars = 12;
    } else if (inputValues.layoutType === "layout3") {
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
            value={inputValues?.layoutType}
            onChange={(e) => handleChange(e, "layoutType")}>
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
              Layout-3
            </option>
          </select>

          <button
            onClick={() => {
              if (inputValues.layoutType === "layout1") {
                generatePDFLayout1(inputValues);
              } else if (inputValues.layoutType === "layout2") {
                generatePDFLayout2(inputValues);
              } else if (inputValues.layoutType === "layout3") {
                generatePDFLayout3(inputValues);
              }
            }}
            className='p-2 m-2 border-1 hover:cursor-pointer'>
            Generate
          </button>

          {/* SELLER DETAILS */}
          <div>
            <Input
              label='Seller Name'
              id='sellerName'
              onChange={(e) => handleChange(e, "sellerName")}
            />
            <Input
              isAddress
              label='Seller Address'
              id='sellerAddress'
              onChange={(e) => handleChange(e, "sellerAddress")}
            />
          </div>
          {/* INVOICE */}
          <div>
            <Input
              label='Invoice No Prefix'
              id='invoiceNoPrefix'
              onChange={(e) => handleChange(e, "invoiceNoPrefix")}
            />
            <Input
              label='Invoice No Start'
              id='invoiceNoStart'
              onChange={(e) => handleChange(e, "invoiceNoStart")}
            />
            <Input
              label='Invoice No Add'
              id='invoiceNoAdd'
              onChange={(e) => handleChange(e, "invoiceNoAdd")}
            />
          </div>
          {/* DATE & TOOTAL */}
          <div>
            <Input
              label='Date Start'
              id='dateStart'
              type='date'
              onChange={(e) => handleChange(e, "dateStart")}
            />
            <Input
              label='TOTAL'
              id='total'
              onChange={(e) => handleChange(e, "total")}
            />
          </div>
          {/* PARTICUARS */}
          <div>
            <Input
              label='No of Particulars'
              id='noOfParticulars'
              value={Number(inputValues.noOfParticulars)}
              onChange={(e) => handleChange(e, "noOfParticulars")}
            />
          </div>
          {Array.from({ length: noOfParticulars || 0 }).map((item, i) => {
            return (
              <div key={i}>
                <label className='p-1 m-1'>{"P-" + Number(i + 1)}</label>
                <input
                  className='bg-[#4A4A4A] text-[#F5F5F5] border-1 border-[#2F2F2F] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 p-1 m-1 w-100'
                  type='text'
                  defaultValue={""}
                  value={inputValues.data.particulars[i]}
                  onChange={(e) => handleChange(e, "particulars", i)}
                />

                <label className='p-1 m-1'>Rate</label>
                <input
                  className='bg-[#4A4A4A] text-[#F5F5F5] border-1 border-[#2F2F2F] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 p-1 m-1'
                  type='text'
                  value={inputValues.data.rate[i]}
                  onChange={(e) => handleChange(e, "rate", i)}
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
