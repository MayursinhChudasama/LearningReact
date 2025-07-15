import { useRef } from "react"
import classes from './NewTodo.module.css'
const NewTodo: React.FC<{onAddTodo: (todoText: string) => void}> = (props) => {
const todoTextInputRef = useRef<HTMLInputElement>(null)

const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = todoTextInputRef.current!.value;

    if (enteredText.trim().length === 0) {
        return;
    }
    props.onAddTodo(enteredText);
}
    return (
        <form className={classes.form} onSubmit={todoSubmitHandler}>
            <input type="text" id="add_todo" ref={todoTextInputRef} />
            <label htmlFor="add_todo">Add Todo</label>
            <button>Add Todo</button>
        </form>
    )
}

export default NewTodo