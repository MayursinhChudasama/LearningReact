import Buyer from "../componenets/Buyer";
import { getData, setData } from "../utils/storage";

export default function HomePage() {
  setData();
  const buyerListData = getData();
  console.log("data", buyerListData);

  return (
    <div className='flex flex-wrap justify-between'>
      {buyerListData.map((buyer) => (
        <div
          key={buyer.buyerName}
          className='w-1/4 p-2'>
          <Buyer buyer={buyer} />
        </div>
      ))}
    </div>
  );
}
