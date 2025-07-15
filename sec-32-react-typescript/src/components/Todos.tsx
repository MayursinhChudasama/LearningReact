import React from 'react';

import Todo from '../models/todo';
import TodoEntry from './TodoEntry';
import classes from './Todos.module.css'

const Todos: React.FC<{ items: Todo[], onDeleteTodo: (todoId: string) => void }> = (props) => {
  return (
    <ul className={classes.todos}>
      {props.items.map((item) => (
       <TodoEntry key={item.id} text={item.text} onDeleteTodo={props.onDeleteTodo} id={item.id}/>
      ))}
    </ul>
  );
};

export default Todos;
