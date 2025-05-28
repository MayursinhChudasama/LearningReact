export default function DeleteButton({ todo, handleDeleteTodos }) {
  return (
    <button
      onClick={() => {
        handleDeleteTodos(todo.id);
      }}
      className='p-1 underline hover:cursor-pointer hover:text-red-400'>
      Delete
    </button>
  );
}
