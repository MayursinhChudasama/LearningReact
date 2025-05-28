import DeleteButton from "./DeleteButton.jsx";
import EditButton from "./EditButton.jsx";

export default function Tasks({ todos, handleEditTodos, handleDeleteTodos }) {
  return (
    <section className='flex gap-10 w-screen'>
      <div className='p-3 m-3 border-1 w-full text-center'>
        <h2 className='underline text-2xl text-green-300'>Completed Tasks</h2>

        {todos
          .filter((todo) => todo.status == true)
          .map((todo, i) => {
            return (
              <div
                key={i}
                className='p-1 '>
                <span className='p-1'>{todo.title}</span>

                <EditButton
                  todo={todo}
                  handleEditTodos={handleEditTodos}
                />

                <DeleteButton
                  todo={todo}
                  handleDeleteTodos={handleDeleteTodos}
                />
              </div>
            );
          })}
      </div>
      <div className='p-3 m-3 w-full border-1 text-center'>
        <h2 className='underline text-2xl text-red-300'>Pending Tasks</h2>
        {todos
          .filter((todo) => todo.status == false)
          .map((todo, i) => {
            return (
              <div
                key={i}
                className='p-1 '>
                <span className='p-1'>{todo.title}</span>
                <EditButton
                  todo={todo}
                  handleEditTodos={handleEditTodos}
                />
                <DeleteButton
                  todo={todo}
                  handleDeleteTodos={handleDeleteTodos}
                />
              </div>
            );
          })}
      </div>
    </section>
  );
}
