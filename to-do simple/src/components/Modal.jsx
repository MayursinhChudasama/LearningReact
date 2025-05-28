import { useRef, useState } from "react";

export function Modal({ ref, handleEditTodos, todo }) {
  const titleRefEdit = useRef();
  const pendingRefEdit = useRef();
  const completedRefEdit = useRef();
  function handleStatus() {
    if (pendingRefEdit.current?.checked) {
      return false;
    } else if (completedRefEdit.current?.checked) {
      return true;
    }
  }
  return (
    <dialog
      className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-full max-w-md'
      ref={ref}>
      <div className='flex gap-2 justify-between'>
        <h1>
          Edit To-do: <span className='underline'>{todo.title}</span>
        </h1>
        <button
          className='hover:bg-red-500 hover:text-white h-9 text-dark  px-5 py-1 mr-2 mb-2 rounded-xl transition duration-300'
          onClick={() => {
            ref.current.close();
          }}>
          X
        </button>
      </div>
      <div className='flex gap-2 justify-center '>
        <input
          className='p-2 border-1 h-9 rounded-sm'
          type='text'
          id='enterEdit'
          ref={titleRefEdit}
          placeholder={" Edit To-do..."}
        />
        <button
          onClick={() => {
            const editedTodo = {
              id: todo.id,
              title: titleRefEdit.current.value,
              status: handleStatus() || "",
            };
            handleEditTodos(todo.id, editedTodo);
            ref.current.close();
          }}
          className='hover:bg-black hover:text-white h-9 text-dark  px-5 py-1 mr-2 mb-2 rounded-xl transition duration-300'>
          Edit: To-do
        </button>
      </div>
      <div className='flex p-1 m-1 gap-2 justify-center '>
        <label htmlFor='completeEdit'> Complete </label>
        <input
          type='radio'
          name='todoTypeEdit'
          id='completeEdit'
          ref={completedRefEdit}
        />
        <label htmlFor='pendingEdit'> Pending </label>
        <input
          type='radio'
          name='todoTypeEdit'
          id='pendingEdit'
          ref={pendingRefEdit}
        />
      </div>
    </dialog>
  );
}
