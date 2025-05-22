import Navbar from "../componenets/Navbar.jsx";
import Sidebar from "../componenets/Sidebar.jsx";
import ShowContent from "../componenets/ShowContent.jsx";
import "./index.css";
import { useState } from "react";
export default function App() {
  const [isAdd, setIsAdd] = useState(true);
  function handleClick() {
    setIsAdd((add) => !add);
  }
  return (
    <>
      <Navbar />
      <div className='flex '>
        <Sidebar handleClick={() => setIsAdd(false)} />
        <ShowContent
          isAdd={isAdd}
          handleIsAdd={(para) => setIsAdd(para)}
          handleClick={handleClick}
        />
      </div>
    </>
  );
}
