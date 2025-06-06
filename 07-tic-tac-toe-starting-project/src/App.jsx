import { useState } from "react"
import Player from "./components/Player.jsx"
import GameBoard from "./components/GameBoard.jsx"
import Log from "./components/Log.jsx"
import {WINNING_COMBINATIONS} from "./winning-combinations.js"
import GameOver from "./components/GameOver.jsx"
const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]


function deriveActivePlayer(gameTurns){
   let currentPlayer = "X"
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O"    
  }
  return currentPlayer
}
function App() {
  const [gameTurns, setGameTurns] = useState([])  
  const [players, setPlayers] = useState({
    "X": "Player1",
    "O": "Player2"
  })
  function handleSetPlayers(symbol, newName){
    setPlayers(prevPlayer=>{
      return {
        ...prevPlayer, 
        [symbol]: newName
      }
    })
  }
  const activePlayer = deriveActivePlayer(gameTurns)
  let gameBoard = [...initialGameBoard.map(innerArr=>[...innerArr])]
    for (let turn of gameTurns){
        const {square, player }= turn
        const {row, col} = square
        gameBoard[row][col] = player
    }
    let winner
    for (let combination of WINNING_COMBINATIONS){      
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

      if(firstSquareSymbol &&
        firstSquareSymbol === secondSquareSymbol &&
        firstSquareSymbol === thirdSquareSymbol
      ){
        winner = players[firstSquareSymbol]        
      }
    }
    const hasDraw = gameTurns.length === 9 && !winner
//
function handleSelectSquare(rowIndex, colIndex){
  
  setGameTurns(prevTurns=>{
  let currentPlayer = deriveActivePlayer(prevTurns)
 
  const updatedTurns = [
    {square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns
  ]
  return updatedTurns
})
}

function handleRestart(){
  setGameTurns([])
}
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player1" symbol="X" isActive={activePlayer === "X"} onChangeName={handleSetPlayers}/>
          <Player name="Player2" symbol="O" isActive={activePlayer === "O"} onChangeName={handleSetPlayers}/>          
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onSetClick = {handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} gameBoard={gameBoard}/>
      </div>
    <Log turns={gameTurns} />
    </main>
  )
}

export default App
