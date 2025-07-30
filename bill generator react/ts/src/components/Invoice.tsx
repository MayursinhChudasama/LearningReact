import InvoiceModal from "./InvoiceModal";
import type { seller } from "../Models/buyer";
import type { singleInvoiceData } from "../Models/buyer";
import { useState } from "react";

const Invoice: React.FC<{
  sellerData: seller | undefined;
  num: number;
}> = ({ sellerData, num }) => {
  console.log("num Invoice", num);
  const [activeInvoice, setActiveInvoice] = useState<string | null>(null);
  return (
    <div className='grid mt-3 grid-cols-8 gap-1'>
      {sellerData?.invoiceData &&
        sellerData?.invoiceData?.map(
          (invoice: singleInvoiceData, index: number) => (
            <div key={invoice.no}>
              <button
                className={`p-2 m-2 rounded-xl hover:cursor-pointer text-sm transition-colors bg-[#e87f05] text-gray-900 hover:bg-[#fbd997] ${
                  activeInvoice === invoice.no ? "bg-[#fbd997]" : ""
                }`}
                onClick={() => {
                  activeInvoice == invoice.no
                    ? setActiveInvoice(null)
                    : setActiveInvoice(invoice.no);
                }}>
                {invoice.date}
              </button>
            </div>
          )
        )}
      {!sellerData?.invoiceData && <h1>No Seller Data</h1>}
      {activeInvoice && (
        <InvoiceModal
          key={activeInvoice}
          sellerData={sellerData}
          num={num}
          activeInvoice={activeInvoice}
        />
      )}
    </div>
  );
};

export default Invoice;
