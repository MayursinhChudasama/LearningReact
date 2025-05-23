export default function NoProject({ addProject }) {
  return (
    <div className='flex flex-col items-center gap-5 p-3'>
      <h1>No project selected</h1>
      <h4>Select a project or get started with a new one.</h4>
      <button
        onClick={addProject}
        className='px-6 py-2 rounded-md bg-blue-200 text-black-50 hover:bg-blue-300 hover:cursor-pointer'>
        Create New Project
      </button>
    </div>
  );
}
