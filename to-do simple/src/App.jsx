import { useState } from "react";
import Navbar from "./components/Navbar";
import Tasks from "./components/Tasks";
import Input from "./components/Input";
import defaultTodos from "./todos.json";
import { storage } from "./storage";

const todo = storage.getData();
if (localStorage.length == 0) {
  storage.setData(defaultTodos);
}
function App() {
  const [todos, setTodos] = useState(todo);
  function handleSetTodo(newTodo) {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    
  }
  function handleEditTodos(id, editedTodo) {
    const updatedTodos = [...todos];
    const foundIndex = updatedTodos.findIndex((todo) => todo.id == id);
    updatedTodos[foundIndex] = editedTodo;
    setTodos(updatedTodos);
  }
  function handleDeleteTodos(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id != id);
    setTodos(updatedTodos);
    storage.setData(todos);
  }
  if (todos.length > 0) {
    storage.setData(todos);
  } else if (todo.length == 1) {
    localStorage.clear();
  }
  return (
    <>
      <Navbar />
      <Input handleSetTodo={handleSetTodo} />
      <Tasks
        todos={todos}
        handleEditTodos={handleEditTodos}
        handleDeleteTodos={handleDeleteTodos}></Tasks>
    </>
  );
}

export default App;
