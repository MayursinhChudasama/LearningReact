import { useEffect, useState } from "react";
import Input from "./Input";
import Seller from "./Seller";
import { dummyBuyers } from "../utils/dummyBuyers";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { buyer } from "../Models/buyer";
import dataSlice from "../store/dataSlice";
import { useFetchDataQuery } from "../store/dataApi";

const InputForm: React.FC = () => {
  const [activeSeller, setActiveSeller] = useState<number | null>(null);
  const inputValues = useSelector((store: any) => store.data);
  const dispatch = useDispatch();
  const params = useParams();
  const { data: buyerListData } = useFetchDataQuery({});

  const currentBuyerData = buyerListData?.find(
    (buyer: buyer) => buyer?.buyerName == params?.buyerName
  );
  const { updateField, updateForm } = dataSlice.actions;

  useEffect(() => {
    if (currentBuyerData) {
      dispatch(updateForm({ currentBuyerData }));
    }
  }, [currentBuyerData]);

  return (
    <form className='min-h-screen bg-[#242424] text-gray-100 p-4 md:p-8'>
      <div className='flex justify-end gap-4 mb-2'>
        <button
          type='button'
          className='px-6 py-2 rounded-md bg-[#181818] text-gray-200 hover:bg-gray-600 hover:cursor-pointer transition-colors'>
          Cancel
        </button>
        {/* <button
          type='submit'
          className='px-6 py-2 rounded-md text-[#e87f05] font-medium hover:bg-[#c0bfbf] hover:text-[#181818] hover:cursor-pointer transition-colors'>
          Generate Invoice
        </button> */}
      </div>
      <div className='max-w-6xl mx-auto'>
        {/* Buyer Information */}
        <div className='bg-[#181818] rounded-lg p-3 mb-4 shadow-lg'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <Input
              obj={{
                id: "buyerName",
                label: "Buyer Name",
                type: "text",
                onInput: (e) =>
                  dispatch(
                    updateField({
                      key: "buyerName",
                      value: e.target.value.trim() || " ",
                      currentBuyerData,
                    })
                  ),
              }}
            />
            <Input
              obj={{
                id: "buyerAddress",
                label: "Buyer Address",
                type: "text",
                isAddress: true,
                onInput: (e) =>
                  dispatch(
                    updateField({
                      key: "buyerAddress",
                      value: e.target.value.trim() || " ",
                      currentBuyerData,
                    })
                  ),
              }}
            />
          </div>
        </div>

        {/* Seller Selection */}
        <div className='bg-[#181818] rounded-lg p-6 mb-4 shadow-lg'>
          <div className='flex flex-wrap gap-3 mb-6'>
            {[1, 2, 3].map((index) => (
              <button
                key={index}
                type='button'
                className={`px-6 py-2 rounded-full hover:cursor-pointer font-medium transition-colors ${
                  activeSeller === index
                    ? "bg-[#e87f05] text-gray-900 hover:bg-[#fbd997]"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
                onClick={() => setActiveSeller(index)}>
                {`Seller ${index}`}
              </button>
            ))}
          </div>

          {/* Seller Details */}
          {activeSeller !== null && <Seller num={activeSeller} />}
        </div>
      </div>
    </form>
  );
};

export default InputForm;
