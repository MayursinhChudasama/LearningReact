import { useRef } from "react";

export default function Input({ handleSetTodo }) {
  const titleRef = useRef();
  const pendingRef = useRef();
  const completedRef = useRef();
  function handleStatus() {
    if (pendingRef.current?.checked) {
      return false;
    } else if (completedRef.current?.checked) {
      return true;
    }
  }

  return (
    <section className='bg-[##808080] p-2 m-2 '>
      <div className='flex gap-2 justify-center '>
        <label
          className='text-lg py-1'
          htmlFor='enter'>
          Enter To-do
        </label>
        <input
          className='p-2 border-1 h-9 rounded-sm'
          type='text'
          id='enter'
          ref={titleRef}
          placeholder=' Enter To-do...'
        />

        <button
          onClick={() => {
            const newTodo = {
              id: Math.random(),
              title: titleRef.current.value,
              status: handleStatus() || "",
            };
            handleSetTodo(newTodo);
          }}
          className='hover:bg-black hover:text-white h-9 text-dark  px-5 py-1 mr-2 mb-2 rounded-xl transition duration-300'>
          Add: To-do
        </button>
      </div>
      <div className='flex p-1 m-1 gap-2 justify-center '>
        <label htmlFor='complete'> Complete </label>
        <input
          type='radio'
          name='todoType'
          id='complete'
          ref={completedRef}
        />
        <label htmlFor='pending'> Pending </label>
        <input
          type='radio'
          name='todoType'
          id='pending'
          ref={pendingRef}
        />
      </div>
    </section>
  );
}
