export default function GameOver({winner, onSetClick}){
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner && <p>{winner} won the game.</p>}
            {!winner && <p>It's a draw.</p>}
            <button onClick={onSetClick}>Rematch!</button>
        </div>
    )
}