import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Square } from './components/Square.jsx'
import { TURNS } from "./constants.js";
import { checkWinnerFrom, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { saveGameToStorage, resetGameStorage } from "./logic/storage/index.js";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? 
          JSON.parse(boardFromStorage)
          :Array(9).fill(null)
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null); //null es que no hay ganador, false es empate

  

  const resetGame = () =>{
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage();
  }



  const updateBoard = (index) => {
    //si la posicion ya tiene algo,  no actualizamos
    if(board[index] || winner) return 
    //actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O :  TURNS.X
    setTurn(newTurn)
    //guardar partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    //revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      confetti();
      setWinner(newWinner)
      //revisar si el juego acabó
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  useEffect(() =>{
    
  },[])
  
  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {
          board.map((_,index) => {
            return (
              <Square 
              key={index}
              index={index} 
              updateBoard={updateBoard}
              >
                {board[index]}
            </Square>
            )
          })
        }
      </section>
      <section className="turn">
      <Square isSelected={turn===TURNS.X}>{TURNS.X}</Square>
      <Square isSelected={turn===TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App;