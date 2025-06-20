import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import Input from "./Input";
import Seller from "./Seller";
import { useDispatch, useSelector } from "react-redux";
import dataSlice from "../store/dataSlice";
import storageSlice from "../store/storageSlice";

export default function DataForm() {
  const inputValues = useSelector((store) => store.data);
  const storedBuyerListData = useSelector((store) => store.storage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { updateField, updateForm } = dataSlice.actions;
  // dispatch(resetState());
  const { handleSaveStorage, handleDelete } = storageSlice.actions;

  const currentBuyerData = storedBuyerListData.find(
    (buyer) => buyer?.buyerName == params?.buyerName
  );
  useEffect(() => {
    if (currentBuyerData) {
      dispatch(updateForm({ currentBuyerData }));
    }
  }, [currentBuyerData]);
  //
  //
  useEffect(() => {
    console.log("from store:--");
    console.log("inputValues->", inputValues);
    console.log("currentBuyerData->", currentBuyerData);
    console.log("storedBuyerListData->", storedBuyerListData);
    console.log("from store:--");
  }, [inputValues, storedBuyerListData]);

  // handleDeleteFn;
  function handleDeleteFn() {
    const result = confirm("Are you sure?");
    if (result) {
      const updatedState = storedBuyerListData.filter(
        (buyer) => buyer.buyerName !== params?.buyerName
      );
      dispatch(handleDelete({ updatedState }));
      navigate("..");
    }
  }
  // handleSaveFn
  function handleSaveFn() {
    const result = confirm("Are you sure?");
    if (result) {
      const index = storedBuyerListData.findIndex(
        (buyer) => buyer.buyerName == params?.buyerName
      );
      const payload = {
        currentBuyerData,
        index,
        updatedCurrentBuyer: inputValues,
      };
      dispatch(handleSaveStorage(payload));
      navigate("..");
    }
  }

  // componenet Return
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className='p-2 m-2'>
      {/* BUYER DETAILS */}
      <div>
        <Input
          label='Buyer Name'
          id='buyerName'
          defaultValue={currentBuyerData?.buyerName}
          onChange={(e) =>
            dispatch(
              updateField({
                key: "buyerName",
                value: e.target.value.trim() || " ",
                currentBuyerData,
              })
            )
          }
        />
        <Input
          isAddress
          label='Buyer Address'
          id='buyerAddress'
          defaultValue={currentBuyerData?.buyerAddress}
          onChange={(e) =>
            dispatch(
              updateField({
                key: "buyerAddress",
                value: e.target.value.trim(),
                currentBuyerData,
              })
            )
          }
        />
        <div className='m-1 p-1'>
          <Input
            isAddress
            label='Type'
            id='type'
            defaultValue={currentBuyerData?.type}
            onInput={(e) =>
              dispatch(
                updateField({
                  key: "type",
                  value: e.target.value.trim(),
                  currentBuyerData,
                })
              )
            }
          />
          {/* SAVE/EDIT BUTTON */}
          <button
            className='mx-20 text-2xl hover:cursor-pointer'
            onClick={handleSaveFn}>
            {params.buyerName ? "📝" : "💾"}
          </button>
          {/* DELETE BUTTON */}
          {params.buyerName && (
            <button
              className='mx-20 text-2xl hover:cursor-pointer'
              onClick={handleDeleteFn}>
              🗑️
            </button>
          )}
        </div>
      </div>
      <div>
        <Seller
          num='1'
          sellerData={currentBuyerData?.seller1}
        />
        <Seller
          num='2'
          sellerData={currentBuyerData?.seller2}
        />
        <Seller
          num='3'
          sellerData={currentBuyerData?.seller3}
        />
      </div>
    </form>
  );
}
