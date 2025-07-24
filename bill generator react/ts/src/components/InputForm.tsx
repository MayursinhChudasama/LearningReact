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
  const { updateField, updateForm, resetState } = dataSlice.actions;

  useEffect(() => {
    if (currentBuyerData) {
      dispatch(updateForm({ currentBuyerData }));
    }
  }, [currentBuyerData]);

  return (
    <form className='min-h-screen bg-[#242424] text-gray-100 p-4 md:p-8'>
      {/*  */}
      <div className='max-w-6xl mx-auto'>
        {/* Buyer Information */}
        <div className='bg-[#181818] rounded-lg p-3 mb-4 shadow-lg'>
          <div className='grid grid-cols-1 md:grid-cols-3'>
            <Input
              obj={{
                id: "buyerName",
                label: "Buyer Name",
                type: "text",
                defaultValue: currentBuyerData?.buyerName,
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
                defaultValue: currentBuyerData?.buyerAddress,
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
          <div className='flex justify-between'>
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
                  onClick={() => {
                    setActiveSeller(index);
                    //   dispatch(resetState({}));
                  }}>
                  {`Seller ${index}`}
                </button>
              ))}
            </div>
            <div className='flex justify-end gap-4 mb-6'>
              <button
                type='button'
                className='px-6 py-2 rounded-md bg-[#181818] text-gray-200 hover:bg-gray-600 hover:cursor-pointer transition-colors'>
                Save Data
              </button>
              <button
                type='submit'
                className='px-6 py-2 rounded-md text-[#e87f05] font-medium hover:bg-[#c0bfbf] hover:text-[#181818] hover:cursor-pointer transition-colors'>
                Generate PDF
              </button>
            </div>
          </div>

          <div>
            {activeSeller === 1 && (
              <Seller
                num={1}
                currentBuyerData={currentBuyerData}
              />
            )}
            {activeSeller === 2 && (
              <Seller
                num={2}
                currentBuyerData={currentBuyerData}
              />
            )}
            {activeSeller === 3 && (
              <Seller
                num={3}
                currentBuyerData={currentBuyerData}
              />
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default InputForm;
