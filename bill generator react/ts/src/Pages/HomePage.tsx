import { Link } from "react-router-dom";
import type { buyer } from "../Models/buyer";
import BuyerCard from "../components/BuyerCard";
import { useFetchDataQuery } from "../store/dataApi";

const HomePage: React.FC = () => {
  const { data: buyerListData } = useFetchDataQuery({});
  console.log("buyerListData", buyerListData);

  return (
    <>
      <div className='flex-1 text-center'>
        <Link
          className='text-2xl hover:text-[#fbd997]'
          to='new'>
          Add New
        </Link>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto'>
        {buyerListData?.map((buyer: buyer) => (
          <Link
            to={buyer.buyerName.trim()}
            key={buyer.buyerName}
            className='block w-full h-full transition-transform hover:scale-[1.02]'>
            <BuyerCard buyer={buyer} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default HomePage;
