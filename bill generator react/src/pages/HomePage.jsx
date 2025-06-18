import { Link } from "react-router";
import Buyer from "../componenets/Buyer";
import { getData, setData } from "../utils/storage";

export default function HomePage() {
  setData();
  const buyerListData = getData();
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
