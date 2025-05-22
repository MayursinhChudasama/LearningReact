export default function Navbar() {
  const liClass = "hover:text-red-700  cursor-pointer p-2 m-2";
  return (
    <nav className='text-black bg-[#d8d5db] flex  items-center  '>
      {/* <button className='basis-08 bg-amber-50 cursor-pointer p-2 m-2'>X</button> */}
      <ul className='flex flex-row ml-auto'>
        <li className={liClass}>HOME</li>
        <li className={liClass}>ABOUT</li>
        <li className={liClass}>CONTACT</li>
        <li className={liClass}>USER</li>
      </ul>
    </nav>
  );
}
