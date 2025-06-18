import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className='m-2 p-2 flex justify-between items-center'>
      <div className=''>
        <Link
          className='text-2xl hover:text-[#fbd997]'
          to='/'>
          🏠︎
        </Link>
      </div>
      <div className='flex-1 text-center'>
        <Link
          className='text-2xl hover:text-[#fbd997]'
          to='new'>
          +New
        </Link>
      </div>
      <hr className='m-2' />
    </nav>
  );
}
