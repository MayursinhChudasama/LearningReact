import { Link } from "react-router";

const Navbar: React.FC = () => {
  return (
    <nav className='m-2 p-2 justify-between items-center'>
      <div className=''>
        <Link
          className='text-3xl hover:text-[#fbd997]'
          to='/'>
          🏠︎
        </Link>
      </div>

      <hr className='m-2 text-amber-50 ' />
    </nav>
  );
};

export default Navbar;
