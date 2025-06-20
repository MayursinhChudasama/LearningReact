import { Link, useParams } from "react-router";

export default function Navbar() {
  const params = useParams();

  return (
    <nav className='m-2 p-2 flex justify-between items-center'>
      <div className=''>
        <Link
          className='text-2xl hover:text-[#fbd997]'
          to='/'>
          🏠︎
        </Link>
      </div>

      <hr className='m-2' />
    </nav>
  );
}
