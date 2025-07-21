import { Link } from "react-router";

import Buyer from "../componenets/Buyer";
import defaultBuyerListData from "../store/storage.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import dataSlice from "../store/dataSlice.js";

export default function HomePage() {
  const dispatch = useDispatch();
  const { resetState } = dataSlice.actions;
  dispatch(resetState());

  const buyerListData =
    JSON.parse(localStorage.getItem("buyers")) || defaultBuyerListData;
  useEffect(() => {
    if (localStorage.length == 0) {
      localStorage.setItem("buyers", JSON.stringify(defaultBuyerListData));
    }
  }, [localStorage]);

  return (
    <>
      <div className='flex-1 text-center'>
        <Link
          className='text-2xl hover:text-[#fbd997]'
          to='new'>
          +New
        </Link>
      </div>
      <div className='flex flex-wrap justify-center'>
        {buyerListData.map((buyer) => {
          return (
            <Link
              to={buyer.buyerName.trim()}
              key={buyer.buyerName}
              className='w-1/4 p-2'>
              <Buyer buyer={buyer} />
            </Link>
          );
        })}
      </div>
    </>
  );
}

export function resetState() {
  // const dispatch = useDispatch();
  // dispatch(resetState());
}
