import projects from "../src/utils/projects.js";
import Project from "./Project.jsx";
import NoProject from "./NoProject.jsx";
import AddProject from "./AddProject.jsx";
//
export default function ShowContent({
  noProject,
  addProject,
  showProject,
  handleIsAdd,
  isAdd,
}) {
  let ShowContent;
  const selectedProject = projects.find((project) => {
    return project.id == isAdd.projectId;
  });
  console.log(selectedProject);
  if (isAdd.projectId === undefined) {
    ShowContent = <NoProject addProject={addProject} />;
  } else if (isAdd.projectId === null) {
    ShowContent = (
      <AddProject
        noProject={noProject}
        handleIsAdd={handleIsAdd}
      />
    );
  } else {
    ShowContent = <Project project={selectedProject} />;
  }

  return (
    <>
      <main className='bg-white w-screen '>{ShowContent}</main>
    </>
  );
}
