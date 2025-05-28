import { useRef } from "react";
import { Modal } from "./Modal";

export default function EditButton({ handleEditTodos, todo }) {
  const dialog = useRef();
  return (
    <>
      <button
        onClick={() => {
          dialog.current.showModal();
        }}
        className='p-1 underline hover:cursor-pointer hover:text-white'>
        Edit
      </button>
      <Modal
        ref={dialog}
        todo={todo}
        handleEditTodos={handleEditTodos}
      />
    </>
  );
}
