import { useState } from "react";
import Input from "./Input";
import generatePDFLayout1 from "../utils/generatePDFLayout1.js";
import generatePDFLayout2 from "../utils/generatePDFLayout2.js";
import generatePDFLayout3 from "../utils/generatePDFLayout3.js";
import { useDispatch, useSelector } from "react-redux";
import dataSlice from "../store/dataSlice.js";
import storageSlice from "../store/storageSlice.js";

const cssClass = `bg-[#4A4A4A] text-[#F5F5F5] border-1 border-[#2F2F2F] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 p-1 m-1 `;

export default function Seller({ sellerData, num }) {
  const inputValues = useSelector((store) => store.data);
  const dispatch = useDispatch();
  const [hide, setShow] = useState(false);

  const { updateField } = dataSlice.actions;
  const { saveInvoiceData } = storageSlice.actions;
  // old
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
  //
  return (
    <section className='py-3 my-2 border-t-2 '>
      {/* SellerNUM */}
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
      {/* LAYOUT */}
      {hide && (
        <div>
          <label
            className='p-1 m-1'
            htmlFor='layoutType'>
            Layout-type
          </label>
          <select
            id='layoutType'
            className={cssClass}
            // value={inputValues?.layoutType}
            onInput={(e) => {
              dispatch(
                updateField({
                  key: "layoutType",
                  value: e.target.value,
                  num,
                  i,
                })
              );
            }}>
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
          {/* GENERATE BUTTON */}
          <button
            onClick={() => {
              // if (inputValues.layoutType === "layout1") {
              //   generatePDFLayout1(inputValues);
              // } else if (inputValues.layoutType === "layout2") {
              //   generatePDFLayout2(inputValues);
              // } else if (inputValues.layoutType === "layout3") {
              //   generatePDFLayout3(inputValues);
              // }
            }}
            className='p-2 m-2 border-1 hover:cursor-pointer'>
            Generate
          </button>
          {/* SAVE BUTTON */}
          <button
            className='mx-20 text-2xl hover:cursor-pointer'
            onClick={() => {
              handleSave(num);
            }}>
            💾
          </button>

          {/* SELLER DETAILS */}
          <div>
            <Input
              label='Seller Name'
              id='sellerName'
              defaultValue={sellerData?.name}
              onInput={(e) => {
                dispatch(
                  updateField({
                    key: "name",
                    value: e.target.value,
                    num,
                    i,
                  })
                );
              }}
            />
            <Input
              isAddress
              label='Seller Address'
              id='sellerAddress'
              defaultValue={sellerData?.address}
              onInput={(e) => {
                dispatch(
                  updateField({
                    key: "address",
                    value: e.target.value,
                    num,
                    i,
                  })
                );
              }}
            />
          </div>
          {/* INVOICE */}
          <div>
            <Input
              label='Invoice No Prefix'
              id='invoiceNoPrefix'
              defaultValue={sellerData?.invoiceNoPrefix}
              onInput={(e) => {
                dispatch(
                  updateField({
                    key: "invoiceNoPrefix",
                    value: e.target.value,
                    num,
                    i,
                  })
                );
              }}
            />
            <Input
              label='Invoice No Start'
              id='invoiceNoStart'
              defaultValue={sellerData?.invoiceNoStart}
              onInput={(e) => {
                dispatch(
                  updateField({
                    key: "invoiceNoStart",
                    value: e.target.value,
                    num,
                    i,
                  })
                );
              }}
            />
            <Input
              label='Invoice No Add'
              id='invoiceNoAdd'
              defaultValue={sellerData?.invoiceNoAdd}
              onInput={(e) => {
                dispatch(
                  updateField({
                    key: "invoiceNoAdd",
                    value: e.target.value,
                    num,
                    i,
                  })
                );
              }}
            />
          </div>
          {/* DATE & TOTAL */}
          <div>
            <Input
              label='Date Start'
              id='dateStart'
              type='date'
              defaultValue={sellerData?.dateStart}
              onInput={(e) => {
                dispatch(
                  updateField({
                    key: "dateStart",
                    value: e.target.value,
                    num,
                    i,
                  })
                );
              }}
            />
            <Input
              label='TOTAL'
              id='total'
              defaultValue={sellerData?.total}
              onInput={(e) => {
                dispatch(
                  updateField({
                    key: "total",
                    value: e.target.value,
                    num,
                    i,
                  })
                );
              }}
            />
          </div>
          {/* PARTICUARS */}
          <div>
            <Input
              label='No of Particulars'
              id='noOfParticulars'
              // value={Number(inputValues[].noOfParticulars)}
              onInput={(e) => {
                dispatch(
                  updateField({
                    key: "noOfParticulars",
                    value: e.target.value,
                    num,
                    i,
                  })
                );
              }}
            />
          </div>
          {Array.from({ length: noOfParticulars || 0 }).map((item, i) => {
            return (
              <div key={i}>
                <label className='p-1 m-1'>{"P-" + Number(i + 1)}</label>
                <input
                  className={cssClass + " w-100"}
                  type='text'
                  // value={inputValues.sellerData.particulars[i]}
                  defaultValue={sellerData?.sellerData?.particulars[i]}
                  onInput={(e) => {
                    dispatch(
                      updateField({
                        key: "particulars",
                        value: e.target.value,
                        num,
                        i,
                      })
                    );
                  }}
                />

                <label className='p-1 m-1'>Rate</label>
                <input
                  className={cssClass}
                  type='text'
                  // value={inputValues.sellerData.rate[i]}
                  defaultValue={sellerData?.sellerData?.rate[i]}
                  onInput={(e) => {
                    dispatch(
                      updateField({
                        key: "rate",
                        value: e.target.value,
                        num,
                        i,
                      })
                    );
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
