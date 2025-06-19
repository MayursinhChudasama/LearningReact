import { Link } from "react-router";

import Buyer from "../componenets/Buyer";
import defaultBuyerListData from "../store/storage.js";

export default function HomePage() {
  const buyerListData = JSON.parse(localStorage.getItem("buyers"));
  if (localStorage.length == 0) {
    localStorage.setItem("buyers", JSON.stringify(defaultBuyerListData));
  }

  return (
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
  );
}
