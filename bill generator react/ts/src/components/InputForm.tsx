import { useEffect, useState } from "react";
import Input from "./Input";
import Seller from "./Seller";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { buyer } from "../Models/buyer";
import dataSlice from "../store/dataSlice";
import {
  useFetchDataQuery,
  usePostDataMutation,
  useDeleteBuyerMutation,
  usePutDataMutation,
} from "../store/dataApi";
import uiSlice from "../store/uiSlice";

const InputForm: React.FC = () => {
  const [activeSeller, setActiveSeller] = useState<number>(1);

  const inputValues = useSelector((store: any) => store.data);

  const dispatch = useDispatch();
  const params = useParams();
  const [postData] = usePostDataMutation();
  const [putData] = usePutDataMutation();
  const [deleteBuyer] = useDeleteBuyerMutation();
  const { data: buyerListData } = useFetchDataQuery({});
  const currentBuyerData = buyerListData?.find(
    (buyer: buyer) => buyer?.buyerName == params?.buyerName
  );
  const [isEditing, setIsEditing] = useState<boolean>(true);

  const [originalValues, setOriginalValues] = useState<any>({});

  const navigate = useNavigate();

  const { updateField, updateForm, resetState, saveInvoiceData } =
    dataSlice.actions;
  const { saveChanges } = uiSlice.actions;

  useEffect(() => {
    if (currentBuyerData) {
      dispatch(updateForm({ currentBuyerData }));
      setIsEditing(false);
    }
  }, [currentBuyerData]);

  async function handleSaveData(e: React.MouseEvent) {
    if (currentBuyerData) {
      try {
        const result = await putData({
          id: currentBuyerData.id,
          editBuyer: inputValues,
        }).unwrap();
        dispatch(saveChanges(true));
        // navigate("/");
      } catch (error) {
        alert("Failed to save data. Please try again.");
      }
    } else {
      await postData(inputValues);

      dispatch(saveChanges(true));
      navigate("/");
    }
  }

  function handleDiscardChanges() {
    setIsEditing(false);
    dispatch(resetState(originalValues));
    dispatch(saveChanges(false));
  }

  async function handleDeleteData() {
    try {
      const id = currentBuyerData.id;
      const result = await deleteBuyer(id).unwrap();
      navigate("/");
    } catch (error) {
      alert("Failed to delete data. Please try again.");
    }
  }

  return (
    <div className='min-h-screen bg-[#242424] text-gray-100 p-4 md:p-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Buyer Information */}
        <div className='bg-[#181818] rounded-lg p-3 mb-4 shadow-lg'>
          <div className='grid grid-cols-1 md:grid-cols-3'>
            <Input
              obj={{
                id: "buyerName",
                label: "Buyer Name",
                type: "text",
                defaultValue: isEditing
                  ? inputValues?.buyerName
                  : currentBuyerData?.buyerName,
                isEditing,
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
                defaultValue: isEditing
                  ? inputValues?.buyerAddress
                  : currentBuyerData?.buyerAddress,
                isEditing,
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
              {currentBuyerData && isEditing && (
                <button
                  // type='button'
                  onClick={handleDiscardChanges}
                  className='px-6 py-2 rounded-md bg-[#181818] text-gray-200 hover:bg-gray-600 hover:cursor-pointer transition-colors'>
                  Discard Changes
                </button>
              )}
              {!currentBuyerData && (
                <button
                  type='button' // Explicitly set type to button
                  onClick={(e) => {
                    handleSaveData(e);
                  }}
                  className='px-6 py-2 rounded-md bg-[#181818] text-gray-200 hover:bg-gray-600 hover:cursor-pointer transition-colors'>
                  Save
                </button>
              )}
              {currentBuyerData && (
                <button
                  // type='button'
                  className='px-6 py-2 rounded-md bg-[#181818] text-gray-200 hover:bg-gray-600 hover:cursor-pointer transition-colors'
                  onClick={(e) => {
                    if (isEditing) {
                      handleSaveData(e);
                    } else {
                      setOriginalValues(inputValues);
                      setIsEditing((edit) => !edit);
                    }
                  }}>
                  {isEditing ? "Save Changes" : "Edit"}
                </button>
              )}

              {currentBuyerData && (
                <button
                  type='button'
                  className='px-6 py-2 rounded-md bg-[#181818] text-gray-200 hover:bg-gray-600 hover:cursor-pointer transition-colors'
                  onClick={handleDeleteData}>
                  Delete
                </button>
              )}

              {/* <button
                type='submit'
                className='px-6 py-2 rounded-md text-[#e87f05] font-medium hover:bg-[#c0bfbf] hover:text-[#181818] hover:cursor-pointer transition-colors'>
                Generate PDF
              </button> */}
            </div>
          </div>

          <div>
            {activeSeller === 1 && (
              <Seller
                num={Number(1)}
                currentBuyerData={currentBuyerData}
                isEditing={isEditing}
              />
            )}
            {activeSeller === 2 && (
              <Seller
                num={Number(2)}
                currentBuyerData={currentBuyerData}
                isEditing={isEditing}
              />
            )}
            {activeSeller === 3 && (
              <Seller
                num={Number(3)}
                currentBuyerData={currentBuyerData}
                isEditing={isEditing}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
