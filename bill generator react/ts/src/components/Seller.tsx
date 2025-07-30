import { useDispatch, useSelector } from "react-redux";

import type { buyer, seller } from "../Models/buyer";

import Input from "./Input";
import dataSlice from "../store/dataSlice";
import { usePutDataMutation } from "../store/dataApi";
import uiSlice from "../store/uiSlice";

import Invoice from "./Invoice";
import generatePDFLayout1 from "../utils/generatePDFLayout1";
import generatePDFLayout2 from "../utils/generatePDFLayout2";
import generatePDFLayout3 from "../utils/generatePDFLayout3";

const cssClass = `bg-[#4A4A4A] text-[#F5F5F5] border-1 border-[#2F2F2F] focus:border-[#e87f05] focus:outline-none focus:ring-2 focus:ring-[#e87f05]/50 p-1 m-1 `;

const Seller: React.FC<{
  num: number;
  currentBuyerData?: buyer;
  isEditing: boolean;
}> = ({ num, currentBuyerData, isEditing }) => {
  console.log("num seller", num);

  const dispatch = useDispatch();

  const inputValues = useSelector((store: any) => store.data);
  const [putData] = usePutDataMutation();

  const { updateField, saveInvoiceData } = dataSlice.actions;
  const { saveChanges } = uiSlice.actions;

  function getSellerByNumber(
    buyer: buyer | undefined,
    num: number
  ): seller | undefined {
    if (num === 1) return buyer?.seller1;
    if (num === 2) return buyer?.seller2;
    if (num === 3) return buyer?.seller3;
  }

  const sellerData = getSellerByNumber(currentBuyerData || inputValues, num);

  function handleParticulars() {
    let noOfParticulars = 0;
    if (sellerData?.layoutType === "layout1") {
      noOfParticulars = 15;
    } else if (sellerData?.layoutType === "layout2") {
      noOfParticulars = 12;
    } else if (sellerData?.layoutType === "layout3") {
      noOfParticulars = 13;
    }
    return noOfParticulars;
  }
  const noOfParticulars: number = handleParticulars();

  async function putDataApi() {
    try {
      const id = currentBuyerData?.id?.toString() || Date.now().toString();

      const result = await putData({
        id,
        editBuyer: inputValues,
      }).unwrap();
      dispatch(saveChanges(true));
    } catch (error) {
      alert("Failed to save data. Please try again.");
    }
  }

  async function handleGenerateInvoiceData() {
    try {
      if (!isEditing) {
        dispatch(
          saveInvoiceData({
            inputValues,
            num,
            currentBuyerData,
          })
        );
      } else {
        alert("Please save the buyer first");
      }
    } catch (err) {
      alert("Unexpected error occurred.");
    }
  }

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

  return (
    <>
      {/* LAYOUT TYPE */}
      <label
        className='p-1 m-1'
        htmlFor='layoutType'>
        Layout-type
      </label>
      <select
        id='layoutType'
        className={cssClass}
        onInput={(e: React.ChangeEvent<HTMLSelectElement>) => {
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
      {/* SELLER DETAILS */}
      <div className='flex gap-2'>
        <Input
          obj={{
            isEditing,
            label: "Seller Name",
            id: "sellerName",

            defaultValue: isEditing
              ? inputValues[`seller${num}`]?.name
              : sellerData?.name,
            onInput: (e) => {
              dispatch(
                updateField({
                  key: "name",
                  value: e.target.value.trim() || "",
                  num,
                  currentBuyerData,
                })
              );
            },
          }}
        />
        <Input
          obj={{
            isEditing,
            isAddress: true,
            label: "Seller Address",
            id: "sellerAddress",
            defaultValue: isEditing
              ? inputValues[`seller${num}`]?.address
              : sellerData?.address,
            onInput: (e) => {
              dispatch(
                updateField({
                  key: "address",
                  value: e.target.value.trim() || "",
                  num,
                  currentBuyerData,
                })
              );
            },
          }}
        />
      </div>
      {/* INVOICE */}
      <div className='flex gap-5'>
        <Input
          obj={{
            isEditing,
            label: "Invoice No Prefix",
            id: "invoiceNoPrefix",
            defaultValue: isEditing
              ? inputValues[`seller${num}`]?.invoiceNoPrefix
              : sellerData?.invoiceNoPrefix,
            onInput: (e) => {
              dispatch(
                updateField({
                  key: "invoiceNoPrefix",
                  value: e.target.value.trim() || "",
                  num,
                  currentBuyerData,
                })
              );
            },
          }}
        />
        <Input
          obj={{
            isEditing,
            label: "Invoice No Start",
            id: "invoiceNoStart",
            defaultValue: isEditing
              ? inputValues[`seller${num}`]?.invoiceNoStart
              : sellerData?.invoiceNoStart,
            onInput: (e) => {
              dispatch(
                updateField({
                  key: "invoiceNoStart",
                  value: Number(e.target.value) || 0,
                  num,
                  currentBuyerData,
                })
              );
            },
          }}
        />
        <Input
          obj={{
            isEditing,
            label: "Invoice No Add",
            id: "invoiceNoAdd",
            defaultValue: isEditing
              ? inputValues[`seller${num}`]?.invoiceNoAdd
              : sellerData?.invoiceNoAdd,
            onInput: (e) => {
              dispatch(
                updateField({
                  key: "invoiceNoAdd",
                  value: Number(e.target.value) || 0,
                  num,
                  currentBuyerData,
                })
              );
            },
          }}
        />
      </div>
      {/* DATE & TOTAL */}
      <div className='flex gap-5 mb-5'>
        <Input
          obj={{
            isEditing,
            label: "Date Start",
            id: "dateStart",
            type: "date",
            defaultValue: isEditing
              ? inputValues[`seller${num}`]?.dateStart
              : sellerData?.dateStart,
            onInput: (e) => {
              dispatch(
                updateField({
                  key: "dateStart",
                  value: e.target.value || "",
                  num,
                  currentBuyerData,
                })
              );
            },
          }}
        />
        <Input
          obj={{
            isEditing,
            label: "TOTAL",
            id: "total",
            defaultValue: isEditing
              ? inputValues[`seller${num}`]?.total
              : sellerData?.total,
            onInput: (e) => {
              dispatch(
                updateField({
                  key: "total",
                  value: Number(e.target.value) || 0,
                  num,
                  currentBuyerData,
                })
              );
            },
          }}
        />
      </div>
      {Array.from({ length: noOfParticulars || 0 }).map((item, i) => (
        <div key={i}>
          <label className='p-1 m-1'>
            {"P-" + (i + 1).toString().padStart(2, "0")}
          </label>
          <input
            className={cssClass + " w-100"}
            disabled={!isEditing}
            type='text'
            value={
              isEditing
                ? inputValues[`seller${num}`]?.data?.particulars[i] ?? ""
                : sellerData?.data?.particulars[i] ?? ""
            }
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
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
            type='number'
            disabled={!isEditing}
            value={
              isEditing
                ? inputValues[`seller${num}`]?.data?.rate[i] ?? 0
                : sellerData?.data?.rate[i] ?? 0
            }
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
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
      ))}
      <div className='p-2'>
        {currentBuyerData && (
          <div>
            <button
              type='button'
              onClick={handleGenerateInvoiceData}
              className='px-6 py-2 rounded-md text-[#e87f05] font-medium hover:bg-[#c0bfbf] hover:text-[#181818] hover:cursor-pointer transition-colors'>
              Generate Invoice Data
            </button>
            <button
              type='button'
              onClick={handleGenereatePDF}
              className='px-6 py-2 rounded-md text-[#e87f05] font-medium hover:bg-[#c0bfbf] hover:text-[#181818] hover:cursor-pointer transition-colors'>
              Generate PDF
            </button>
          </div>
        )}
        <Invoice
          sellerData={sellerData}
          num={num}
        />
      </div>
    </>
  );
};

export default Seller;
