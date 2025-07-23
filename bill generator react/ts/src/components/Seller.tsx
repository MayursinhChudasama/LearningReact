import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import type { buyer, seller } from "../Models/buyer";

import Input from "./Input";
import dataSlice from "../store/dataSlice";
import { useFetchDataQuery } from "../store/dataApi";

const cssClass = `bg-[#4A4A4A] text-[#F5F5F5] border-1 border-[#2F2F2F] focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 p-1 m-1 `;

const Seller: React.FC<{ sellerData?: seller; num: number }> = ({
  sellerData,
  num,
}) => {
  const dispatch = useDispatch();
  const params = useParams();
  const inputValues = useSelector((store: any) => store.data);
  console.log("inputValues", inputValues);

  const { data: buyerListData } = useFetchDataQuery({});

  const { updateField, saveInvoiceData } = dataSlice.actions;

  const storedBuyerListDataCopy = JSON.parse(JSON.stringify(buyerListData));

  const currentBuyerData = storedBuyerListDataCopy?.find(
    (buyer: buyer) => buyer.buyerName == params?.buyerName
  );
  console.log("currentBuyerData", currentBuyerData);

  function handleParticulars() {
    let noOfParticulars = 0;
    if (inputValues[`seller${num}`]?.layoutType === "layout1") {
      noOfParticulars = 15;
    } else if (inputValues[`seller${num}`]?.layoutType === "layout2") {
      noOfParticulars = 12;
    } else if (inputValues[`seller${num}`]?.layoutType === "layout3") {
      noOfParticulars = 13;
    }
    return noOfParticulars;
  }
  const noOfParticulars: number = handleParticulars();

  return (
    <>
      {/* SELLER DETAILS */}
      <div>
        <Input
          obj={{
            label: "Seller Name",
            id: "sellerName",
            defaultValue: sellerData?.name,
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
            isAddress: true,
            label: "Seller Address",
            id: "sellerAddress",
            defaultValue: sellerData?.address,
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
            label: "Invoice No Prefix",
            id: "invoiceNoPrefix",
            defaultValue: sellerData?.invoiceNoPrefix,
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
            label: "Invoice No Start",
            id: "invoiceNoStart",
            defaultValue: sellerData?.invoiceNoStart,
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
            label: "Invoice No Add",
            id: "invoiceNoAdd",
            defaultValue: sellerData?.invoiceNoAdd,
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
            label: "Date Start",
            id: "dateStart",
            type: "date",
            defaultValue: sellerData?.dateStart,
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
            label: "TOTAL",
            id: "total",
            defaultValue: sellerData?.total,
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
      {Array.from({ length: noOfParticulars || 0 }).map((item, i) => {
        return (
          <div key={i}>
            <label className='p-1 m-1'>{"P-" + Number(i + 1)}</label>
            <input
              className={cssClass + " w-100"}
              type='text'
              // value={inputValues.sellerData.particulars[i]}
              defaultValue={sellerData?.data?.particulars[i] ?? ""}
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
              type='text'
              // value={inputValues.sellerData.rate[i]}
              defaultValue={sellerData?.data?.rate[i] ?? ""}
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
        );
      })}
    </>
  );
};

export default Seller;
