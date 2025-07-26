import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import type { buyer, seller } from "../Models/buyer";

import Input from "./Input";
import dataSlice from "../store/dataSlice";
import { useFetchDataQuery } from "../store/dataApi";

const cssClass = `bg-[#4A4A4A] text-[#F5F5F5] border-1 border-[#2F2F2F] focus:border-[#e87f05] focus:outline-none focus:ring-2 focus:ring-[#e87f05]/50 p-1 m-1 `;

const Seller: React.FC<{ num: number; currentBuyerData?: buyer }> = ({
  num,
  currentBuyerData,
}) => {
  const dispatch = useDispatch();
  const params = useParams();
  const inputValues = useSelector((store: any) => store.data);
  console.log("inputValues", inputValues);

  const { data: buyerListData } = useFetchDataQuery({});

  const { updateField, saveInvoiceData } = dataSlice.actions;

    const storedBuyerListDataCopy = JSON.parse(JSON.stringify(buyerListData));

  console.log("currentBuyerData", currentBuyerData);

  function getSellerByNumber(
    buyer: buyer | undefined,
    num: number
  ): seller | undefined {
    if (!buyer) return undefined;
    if (num === 1) return buyer.seller1;
    if (num === 2) return buyer.seller2;
    if (num === 3) return buyer.seller3;
    return undefined;
  }

  const sellerData = getSellerByNumber(currentBuyerData, num);
  console.log("sellerData", sellerData);

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

  return (
    <>
      {/* SELLER DETAILS */}
      <div className='flex gap-2'>
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
      {Array.from({ length: noOfParticulars || 0 }).map((item, i) => (
        <div key={i}>
          <label className='p-1 m-1'>
            {"P-" + (i + 1).toString().padStart(2, "0")}
          </label>
          <input
            className={cssClass + " w-100"}
            type='text'
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
            type='number'
            defaultValue={sellerData?.data?.rate[i]}
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
    </>
  );
};

export default Seller;
