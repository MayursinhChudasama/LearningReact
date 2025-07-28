import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const changesSaved = useSelector((store: any) => store.ui.saved);
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!changesSaved) {
      const confirmLeave = window.confirm(
        "Are you sure you want to go to the home page? Any unsaved changes may be lost."
      );
      if (confirmLeave) {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  return (
    <nav className='m-2 p-2 justify-between items-center'>
      <div className=''>
        <p
          className='text-3xl hover:text-[#fbd997] cursor-pointer'
          onClick={handleHomeClick}>
          🏠︎
        </p>
      </div>

      <hr className='m-2 text-amber-50 ' />
    </nav>
  );
};

export default Navbar;
