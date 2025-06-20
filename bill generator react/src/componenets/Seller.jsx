import { useState } from "react";
import Input from "./Input";
import generatePDFLayout1 from "../utils/generatePDFLayout1.js";
import generatePDFLayout2 from "../utils/generatePDFLayout2.js";
import generatePDFLayout3 from "../utils/generatePDFLayout3.js";
import { useDispatch, useSelector } from "react-redux";
import dataSlice from "../store/dataSlice.js";
import { useParams } from "react-router";
import { invoiceDataFn } from "../utils/invoiceData.js";

const cssClass = `bg-[#4A4A4A] text-[#F5F5F5] border-1 border-[#2F2F2F] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 p-1 m-1 `;

export default function Seller({ sellerData, num }) {
  const storedBuyerListData = useSelector((store) => store.storage);
  const inputValues = useSelector((store) => store.data);
  const params = useParams();
  const dispatch = useDispatch();
  const [hide, setShow] = useState(false);
  const { updateField, saveInvoiceData } = dataSlice.actions;
  // const { saveInvoiceData } = storageSlice.actions;
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

  const storedBuyerListDataCopy = JSON.parse(
    JSON.stringify(storedBuyerListData)
  );

  const currentBuyerData = storedBuyerListDataCopy.find(
    (buyer) => buyer.buyerName == params?.buyerName
  );

  function handleSaveDataOnlyFn() {
    console.log("this is Seller Save Button");
    //
    dispatch(
      saveInvoiceData({
        inputValues,
        num,
        currentBuyerData,
      })
    );
  }
  //
  function handleGenereatePDF() {
    if (!inputValues[`seller${num}`].invoiceData) {
      alert("Generate data first by clicking on Save Data only");
      return;
    }
    let seller = inputValues[`seller${num}`];
    const FINAL_DATA_FOR_PDF = {
      layoutType: seller.layoutType,
      buyerName: inputValues.buyerName,
      buyerAddress: inputValues.buyerAddress,
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
      invoiceData: seller.invoiceData,
    };
    console.log("FINAL_DATA_FOR_PDF***", FINAL_DATA_FOR_PDF);

    if (seller.layoutType === "layout1") {
      generatePDFLayout1(FINAL_DATA_FOR_PDF);
    } else if (seller.layoutType === "layout2") {
      generatePDFLayout2(FINAL_DATA_FOR_PDF);
    } else if (seller.layoutType === "layout3") {
      generatePDFLayout3(FINAL_DATA_FOR_PDF);
    }
  }
  // old
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
                  value: e.target.value.trim(),
                  num,
                  currentBuyerData,
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
            onClick={handleGenereatePDF}
            className='p-2 m-2 border-1 hover:cursor-pointer'>
            Generate PDF
          </button>
          {/* SAVE BUTTON */}
          <button
            className='mx-10 p-2 m-2 border-1 hover:cursor-pointer'
            onClick={handleSaveDataOnlyFn}>
            Save Data Only
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
                    value: e.target.value.trim() || "",
                    num,
                    currentBuyerData,
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
                    value: e.target.value.trim() || "",
                    num,
                    currentBuyerData,
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
                    value: e.target.value.trim() || "",
                    num,
                    currentBuyerData,
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
                    value: Number(e.target.value) || 0,
                    num,
                    currentBuyerData,
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
                    value: Number(e.target.value) || 0,
                    num,
                    currentBuyerData,
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
                    value: e.target.value || "",
                    num,
                    currentBuyerData,
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
                    value: Number(e.target.value) || 0,
                    num,
                    currentBuyerData,
                  })
                );
              }}
            />
          </div>
          {/* PARTICUARS */}
          {/* <div>
            <Input
              label='No of Particulars'
              id='noOfParticulars'
              // value={Number(inputValues[].noOfParticulars)}
              onInput={(e) => {
                dispatch(
                  updateField({
                    key: "noOfParticulars",
                    value: Number(e.target.value) || noOfParticulars,
                    num,
                  })
                );
              }}
            />
          </div> */}
          {Array.from({ length: noOfParticulars || 0 }).map((item, i) => {
            return (
              <div key={i}>
                <label className='p-1 m-1'>{"P-" + Number(i + 1)}</label>
                <input
                  className={cssClass + " w-100"}
                  type='text'
                  // value={inputValues.sellerData.particulars[i]}
                  defaultValue={sellerData?.data?.particulars[i] ?? ""}
                  onInput={(e) => {
                    dispatch(
                      updateField({
                        key: "particulars",
                        value: e.target.value.trim() ?? "",
                        num,
                        i,
                        currentBuyerData,
                      })
                    );
                  }}
                />

                <label className='p-1 m-1'>Rate</label>
                <input
                  className={cssClass}
                  type='text'
                  // value={inputValues.sellerData.rate[i]}
                  defaultValue={sellerData?.data?.rate[i] ?? ""}
                  onInput={(e) => {
                    dispatch(
                      updateField({
                        key: "rate",
                        value: Number(e.target.value) ?? 0,
                        num,
                        i,
                        currentBuyerData,
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
