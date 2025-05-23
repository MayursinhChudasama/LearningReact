export default function Project({ project }) {
  return (
    <>
      <section className='p-3 m-3'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl'>{project.title}</h1>
          <button className='px-6 py-2 rounded-md bg-blue-200 text-black-50 hover:bg-blue-300 hover:cursor-pointer'>
            Delete
          </button>
        </div>
        <p className='my-3'>{project.desc}</p>
        <p className='my-3 pb-2 border-b-2'>{project.dueDate}</p>
      </section>
      <h2 className='p-3 m-3 text-2xl font-bold text-stone-700 mb-4'>Tasks</h2>
    </>
  );
}
