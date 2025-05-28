import { createContext } from "react";
import { useState } from "react";

const Todos = createContext({
  todos: [],
});

export default function TodosProvider({ children }) {
  const [todosState, settodosState] = useState({
    todos: [],
  });
  const ctxValue = todosState;
  return <Todos.Provider>{children}</Todos.Provider>;
}
