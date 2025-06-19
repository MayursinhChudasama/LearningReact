import DeleteBtn from "./DeleteBtn";

export default function Buyer({ buyer }) {
  return (
    <article className='w-100 h-64 m-4 p-4 rounded-xl text-center bg-[#181818] text-white shadow-[0_4px_12px_rgba(255,255,255,0.15)] flex flex-col justify-between hover:shadow-[#fbd997]'>
      <h3 className='text-lg font-semibold'>{buyer.buyerName}</h3>
      <p className='text-sm text-gray-300 mb-4'>{buyer.buyerAddress}</p>

      <div className='flex flex-col gap-1 mb-4'>
        <p className='text-sm'>{buyer?.seller1.name}</p>
        <p className='text-sm'>{buyer?.seller2.name}</p>
        <p className='text-sm'>{buyer?.seller3.name}</p>
      </div>

      <p className='text-sm font-medium mb-1'>'Type'</p>
      <div>
        <p className='text-xs text-gray-400'>'Date' </p>
        <span></span>
      </div>
    </article>
  );
}
