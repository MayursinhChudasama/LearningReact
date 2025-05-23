import projects from "../src/utils/projects.js";
export default function Sidebar({ handleProject, handleClick, isAdd }) {
  return (
    <section className='bg-[#d8d5db] flex flex-col h-220 w-70 '>
      <h1 className='bg-blue-50 text-center p-10 h-30'>Your Projects</h1>
      <button
        onClick={handleClick}
        className='px-4  py-2 text-xs md:text-base rounded-md bg-emerald-200 text-black-50 hover:bg-emerald-300 hover:cursor-pointer'>
        + Add Project
      </button>
      {/* all projects */}
      <div className='flex flex-col bg-blue-100'>
        {projects.map((project, i) => {
          let cssClasses = "h-20  text-center p-7 hover:cursor-pointer";
          if (isAdd.projectId == project.id) {
            cssClasses += " bg-blue-200";
          } else {
            cssClasses += " bg-blue-100";
          }
          return (
            <button
              onClick={() => handleProject(project.id)}
              key={project.id}
              className={cssClasses}>
              {project.title}
            </button>
          );
        })}
      </div>
    </section>
  );
}
