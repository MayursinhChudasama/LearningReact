import Navbar from "../componenets/Navbar.jsx";
import Sidebar from "../componenets/Sidebar.jsx";
import ShowContent from "../componenets/ShowContent.jsx";
import "./index.css";
import { useState } from "react";
export default function App() {
  const [isAdd, setIsAdd] = useState(true);
  const [showProject, setShowProject] = useState(false);
  function handleClick() {
    setIsAdd((add) => !add);
  }
  function handleShowProject() {
    setShowProject((show) => !show);
  }
  return (
    <>
      <Navbar />
      <div className='flex '>
        <Sidebar
          handleProject={handleShowProject}
          handleClick={() => setIsAdd(false)}
        />
        <ShowContent
          isAdd={isAdd}
          handleIsAdd={(para) => setIsAdd(para)}
          handleClick={handleClick}
          showProject={showProject}
        />
      </div>
    </>
  );
}
