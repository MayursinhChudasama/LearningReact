import { useState } from "react"
import Input from "../components/Input.jsx"
import ResultTable from "../components/ResultTable.jsx"
import {calculateInvestmentResults} from "../src/util/investment.js"

const initialObj = {
  initialInvestment: "",
  annualInvestment: "",
  expectedReturn: "",
  duration: "",
}
let newObj = {...initialObj}
function App() {
  const [data, setData] = useState()
  function hanldeOnChange(event){
    for(let key in newObj){      
      if (event.currentTarget.id == key) {        
  newObj[key] = Number(event.target.value)
}}
    setData(()=> calculateInvestmentResults(newObj)  )

  }
  const isValid = newObj.duration >0
  
  return (
    <>
    <div id="user-input" className="input-group">
      <div>
        <Input setOnChange={hanldeOnChange}  inputId="initialInvestment" label="Initial Investment"/>
      <Input setOnChange={hanldeOnChange} inputId="expectedReturn" label="Expected Return"/>
      </div>
      <div>
        <Input setOnChange={hanldeOnChange}  inputId="annualInvestment" label="Annual Investment"/>
      <Input setOnChange={hanldeOnChange}  inputId="duration" label="Duration"/>
      </div>
    </div>
    <div >{isValid && <ResultTable tableData={data}/>}</div>
    <div >{!isValid && <p className="center">Enter valid value.</p>}</div>
   
    </>
  )
}

export default App
