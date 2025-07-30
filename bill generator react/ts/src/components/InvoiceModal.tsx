import { useEffect, useRef, useState } from "react";
import { buyer, seller, singleInvoiceData } from "../Models/buyer";
import { useFetchDataQuery, usePutDataMutation } from "../store/dataApi";
import { useParams } from "react-router-dom";

const thClasses =
  "px-6 py-3 text-center text-base text-sm text-[#F5F5F5] uppercase";
const inputClasses =
  "w-full p-1 text-sm bg-transparent focus:outline-none text-center text-[#F5F5F5] focus:border-b-1 focus:border-[#e87f05]";
const tdClasses = "p-2 whitespace-nowrap text-sm text-center text-[#F5F5F5]";
const labelClasses = "block text-sm font-medium text-[#A0A0A0]";

const InvoiceModal: React.FC<{
  sellerData: seller | undefined;
  activeInvoice: string | null;
  num: number;
}> = ({ sellerData, activeInvoice, num }) => {
  console.log("num InvoiceModal", num);
  const { data } = useFetchDataQuery({});
  console.log("final buyer data", data);

  const params = useParams();

  const amountRef = useRef<HTMLParagraphElement>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [originalValues, setOriginalValues] = useState<any>({});
  const [specificInvoiceData, setSpecificInvoiceData] =
    useState<singleInvoiceData>({
      no: "",
      date: "",
      particulars: [],
      qty: [],
      rate: [],
      amount: [],
      totalAmount: 0,
    });

  // const [putSellerData] = usePutSellerDataMutation();
  const [putData] = usePutDataMutation();

  const currentBuyerData = data?.find(
    (buyer: buyer) => buyer?.buyerName == params?.buyerName
  );

  useEffect(() => {
    if (activeInvoice) {
      const currentInvoiceData = sellerData?.invoiceData?.find(
        (invoice) => invoice.no === activeInvoice
      );
      if (currentInvoiceData) {
        setSpecificInvoiceData(currentInvoiceData);
      }
    }
  }, [activeInvoice]);

  function handleUpdateInoviceData(
    e: React.ChangeEvent<HTMLInputElement>,
    key: string,
    index: number
  ) {
    let value: number | string = e.target.value;
    if (key == "qty" || key == "rate") {
      value = Number(value);
    }
    if (key == "particulars" || key == "qty" || key == "rate") {
      const updatedKeys = [...specificInvoiceData[key]];
      updatedKeys[index] = value;
      setSpecificInvoiceData((specificInvoiceData) => ({
        ...specificInvoiceData,
        [key]: updatedKeys,
      }));
    } else {
      setSpecificInvoiceData((specificInvoiceData) => ({
        ...specificInvoiceData,
        [key]: value,
      }));
    }
  }

  function handleUpdateInvoiceData() {
    if (!sellerData) {
      return;
    }
    const updatedSellerData = {
      ...sellerData,
      invoiceData: sellerData.invoiceData ? [...sellerData.invoiceData] : [],
    };
    const index: number | undefined = sellerData?.invoiceData?.findIndex(
      (invoice) => invoice.no === activeInvoice
    );
    if (index !== undefined) {
      updatedSellerData.invoiceData[index] = specificInvoiceData;
    }
    // console.log("updatedSellerData", updatedSellerData);
    // console.log("`seller${num}`", `seller${num}`);

    const updatedBuyer = { ...currentBuyerData };
    updatedBuyer[`seller${num}`] = updatedSellerData;
    return updatedBuyer;
  }

  async function handleSaveChanges() {
    const updatedBuyer = handleUpdateInvoiceData();
    if (!updatedBuyer) {
      // console.error("Cannot save changes: No seller data available");
      return;
    }
    console.log("updatedBuyer", updatedBuyer);

    try {
      await putData({
        id: currentBuyerData?.id,
        editBuyer: updatedBuyer,
      }).unwrap();
    } catch (error) {
      // console.log(error);
      alert(error);
    }
  }

  useEffect(() => {
    setSpecificInvoiceData((invoiceData) => ({
      ...invoiceData,
      amount: invoiceData.qty.map(
        (qty, index) => qty * invoiceData.rate[index]
      ),
    }));
  }, [specificInvoiceData.qty, specificInvoiceData.rate]);

  useEffect(() => {
    setSpecificInvoiceData((invoiceData) => ({
      ...invoiceData,
      totalAmount: invoiceData.amount.reduce((a, b) => a + b, 0),
    }));
  }, [specificInvoiceData.amount]);

  return (
    <div className='p-5 w-250 mx-auto bg-[#2F2F2F] rounded-lg shadow-md text-[#F5F5F5]'>
      <div className='flex gap-5 mb-6 text-center justify-end'>
        {!isDisabled && (
          <button
            onClick={() => {
              setSpecificInvoiceData(originalValues);
              setOriginalValues({});
              setIsDisabled(true);
            }}
            className={` text-gray-900 hover:bg-[#fbd997] p-2 w-25 hover:cursor-pointer rounded-xl ${
              isDisabled ? " bg-[#e2cda2]" : "bg-[#e87f05]"
            }`}>
            Discard Changes
          </button>
        )}
        <button
          onClick={() => {
            setIsDisabled((disable) => !disable);
            setOriginalValues(specificInvoiceData);
            if (!isDisabled) {
              handleSaveChanges();
            }
          }}
          className={` text-gray-900 hover:bg-[#fbd997] p-2 w-25 hover:cursor-pointer rounded-xl ${
            isDisabled ? " bg-[#e2cda2]" : "bg-[#e87f05]"
          }`}>
          {isDisabled ? "Edit" : "Save Changes"}
        </button>
        <label className={labelClasses}>
          Invoice No:
          <input
            type='text'
            defaultValue={specificInvoiceData?.no || ""}
            className={inputClasses}
            disabled={isDisabled}
            onChange={(e) => handleUpdateInoviceData(e, "no", 0)}
          />
        </label>
        <label className={labelClasses}>
          Date:
          <input
            type='text'
            defaultValue={specificInvoiceData?.date || ""}
            className={inputClasses}
            disabled={isDisabled}
            onChange={(e) => handleUpdateInoviceData(e, "date", 0)}
          />
        </label>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-[#4A4A4A]'>
          <thead className='bg-[#1F1F1F]'>
            <tr>
              <th className={thClasses}>#</th>
              <th className={thClasses}>Particulars</th>
              <th className={thClasses}>Quantity</th>
              <th className={thClasses}>Rate</th>
              <th className={thClasses}>Amount</th>
            </tr>
          </thead>
          <tbody className='bg-[#2F2F2F] divide-y divide-[#4A4A4A]'>
            {specificInvoiceData?.particulars?.map(
              (item: string, index: number) => (
                <tr
                  key={index}
                  className='hover:bg-[#3A3A3A]'>
                  <td className={tdClasses}>{index + 1}</td>
                  <td className={tdClasses}>
                    <input
                      id={`particular-${index}`}
                      value={item || ""}
                      className={inputClasses}
                      disabled={isDisabled}
                      onChange={(e) =>
                        handleUpdateInoviceData(e, "particulars", index)
                      }
                    />
                  </td>
                  <td className={tdClasses}>
                    <input
                      id={`qty-${index}`}
                      type='number'
                      value={specificInvoiceData?.qty[index] || ""}
                      className={inputClasses}
                      disabled={isDisabled}
                      onChange={(e) => handleUpdateInoviceData(e, "qty", index)}
                    />
                  </td>
                  <td className={tdClasses}>
                    <input
                      id={`rate-${index}`}
                      type='number'
                      step='0.01'
                      value={specificInvoiceData?.rate[index] || ""}
                      className={inputClasses}
                      disabled={isDisabled}
                      onChange={(e) =>
                        handleUpdateInoviceData(e, "rate", index)
                      }
                    />
                  </td>
                  <td className={tdClasses}>
                    <p ref={amountRef}>
                      {specificInvoiceData.qty[index] *
                        specificInvoiceData.rate[index]}
                    </p>
                  </td>
                </tr>
              )
            )}
            <tr className='bg-[#1F1F1F]'>
              <td
                colSpan={4}
                className={tdClasses}>
                Total Amount:
              </td>
              <td className={tdClasses}>
                <span>{specificInvoiceData?.totalAmount}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceModal;
