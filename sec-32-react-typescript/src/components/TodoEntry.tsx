import classes from './TodoEntry.module.css'
const TodoEntry: React.FC<{ text: string, onDeleteTodo: (todoId: string) => void, id: string }> = (props) => {

    const deleteTodoHandler = (event: React.MouseEvent) => {
        props.onDeleteTodo(props.id)
    }
    return (
        <><li className={classes.item}>{props.text} <button onClick={deleteTodoHandler}>Delete</button></li></>
    )
}

export default TodoEntry