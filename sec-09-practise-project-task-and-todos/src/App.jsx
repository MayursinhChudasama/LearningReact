import projects from "../src/utils/projects.js";
import Navbar from "../componenets/Navbar.jsx";
import Sidebar from "../componenets/Sidebar.jsx";
import ShowContent from "../componenets/ShowContent.jsx";
import "./index.css";
import { useState } from "react";
export default function App() {
  const [isAdd, setIsAdd] = useState({ projectId: undefined });
  // const [showProject, setShowProject] = useState(false);
  function handleNoProject() {
    setIsAdd({ projectId: undefined });
  }
  function handleAddProject() {
    setIsAdd({ projectId: null });
  }
  function handleShowProject(id) {
    setIsAdd({ projectId: id });
  }
  
  return (
    <>
      <Navbar />
      <div className='flex '>
        <Sidebar
          handleProject={handleShowProject}
          handleClick={handleAddProject}
          isAdd={isAdd}
        />
        <ShowContent
          isAdd={isAdd}
          handleIsAdd={(para) => setIsAdd(para)}
          noProject={handleNoProject}
          addProject={handleAddProject}
          showProject={handleShowProject}
        />
      </div>
    </>
  );
}
