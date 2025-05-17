export default function Input({label, setOnChange, inputId, defVal}){
    return <><label >{label}<input type="number" value={defVal} id={inputId} onChange={setOnChange}/></label></>
}