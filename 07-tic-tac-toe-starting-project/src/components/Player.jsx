import { useState } from "react"

export default function Player({name, symbol, isActive}){
    const [editedName, setEditedName ] = useState(name)
    const [isEditing, setIsEditing]   = useState(false)
    let playerName = <span className="player-name">{editedName}</span>
    let btnCaption = "Edit"
    function handleEditClick(){
       setIsEditing((edit)=>!edit)
    }
    function handleChange(event){
        setEditedName(event.target.value)
    }
    if (isEditing) {
       playerName = <input type="text" required defaultValue={editedName} onChange={handleChange}/>
        btnCaption = "Save"
    }
    return (<li className={isActive ? 'active' : undefined}>
            <span className="player">
            {playerName }
            <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{btnCaption}</button>
            </li>)
}