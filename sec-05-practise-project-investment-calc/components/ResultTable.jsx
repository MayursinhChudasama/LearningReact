import {formatter} from "../src/util/investment.js"
export default function ResultTable({tableData}){
    console.log('tableData', tableData);
    
    let showData = function(){
        if(tableData){
            return tableData.map((yearData, i)=>{
                const initialInvestment = tableData[0].valueEndOfYear - tableData[0].interest - tableData[0].annualInvestment
                const totalInterest = yearData.valueEndOfYear - yearData.annualInvestment * yearData.year - initialInvestment
                const totalAmtInvested = yearData.valueEndOfYear - totalInterest
                return <tr key={i}>               
                <td>{yearData.year}</td>
                <td>{formatter.format(yearData.valueEndOfYear)}</td>
                <td>{formatter.format(yearData.interest)}</td>
                <td>{formatter.format(totalInterest)}</td>
                <td>{formatter.format(totalAmtInvested)}</td>
                </tr>
            })
        }}
    return (
    <table id="result" className="center">
        <thead className="center">
            <tr>
                <th>Year</th>
                <th>Investment Value</th>
                <th>Interest(Year)</th>
                <th>Total Interest</th>
                <th>Invested Capital</th>
            </tr>
        </thead>
        <tbody className="center">            
            {showData()}
        </tbody>
    </table>
)
}