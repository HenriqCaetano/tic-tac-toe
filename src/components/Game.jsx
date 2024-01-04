import React, { useCallback, useEffect, useState } from "react";
import Board from "./Board";
import GameHistory from "./GameHistory";

export default function Game() {
  //verifica de quem é a vez
  const [isXNext, setIsXNext] = useState(true);

  //verifica se já houve vencedor
  const [doesWinnerExist, setDoesWinnerExist] = useState(false);

  //verifica se é empate
  const [isDraw, setIsDraw] = useState(false);

  //conteúdo inicial de cada quadrado
  const [squares, setSquares] = useState([
    { id: 0, value: "", locked: false, class: "square" },
    { id: 1, value: "", locked: false, class: "square" },
    { id: 2, value: "", locked: false, class: "square" },
    { id: 3, value: "", locked: false, class: "square" },
    { id: 4, value: "", locked: false, class: "square" },
    { id: 5, value: "", locked: false, class: "square" },
    { id: 6, value: "", locked: false, class: "square" },
    { id: 7, value: "", locked: false, class: "square" },
    { id: 8, value: "", locked: false, class: "square" },
  ]);

  //verifica se há vencedor
  //retorna o conjunto vencedor de quadrados ou null, se não há vencedor ainda
  const getWinnerSquares = useCallback(() => {
    //configurações de vitória
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    //verifica cada configuração possível
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a].value &&
        squares[a].value === squares[b].value &&
        squares[a].value === squares[c].value
      ) {
        return [squares[a], squares[b], squares[c]];
      }
    }
    return null;
  }, [squares]);

  //função que atualiza o jogo
  function handleSquareClick(id) {
    //atualiza os quadrados
    setSquares((currentSquares) => {
      return currentSquares.map((square) => {
        if (square.id === id && !square.locked) {
          if (isXNext) {
            setIsXNext(false); //passa a vez
            return { ...square, value: "X", locked: true };
          } else {
            setIsXNext(true);
            return { ...square, value: "O", locked: true };
          }
        }
        return square;
      });
    });
  }

  //verifica se houve vencedor sempre que o jogo muda
  useEffect(() => {
    let winnerSquares = getWinnerSquares();

    //if there is a winner
    if (winnerSquares && !doesWinnerExist && !isDraw) {
      setSquares((currentSquares) => {
        return currentSquares.map((square) => {
          if (
            square.id === winnerSquares[0].id ||
            square.id === winnerSquares[1].id ||
            square.id === winnerSquares[2].id
          ) {
            return { ...square, class: "winnerSquare" };
          }

          return { ...square, locked: true }; //locks all squares
        });
      });
      setDoesWinnerExist(true);
    }

    //its a draw?
    if (
      !winnerSquares &&
      squares.every((square) => square.locked === true) &&
      !isDraw
    ) {
      setSquares((currentSquares) => {
        return currentSquares.map((square) => {
          return { ...square, class: "drawSquare" };
        });
      });
      setIsDraw(true);
    }
  }, [squares, getWinnerSquares, doesWinnerExist, isDraw]);

  //reinicia o jogo
  function reStart() {
    setSquares([
      { id: 0, value: "", locked: false, class: "square" },
      { id: 1, value: "", locked: false, class: "square" },
      { id: 2, value: "", locked: false, class: "square" },
      { id: 3, value: "", locked: false, class: "square" },
      { id: 4, value: "", locked: false, class: "square" },
      { id: 5, value: "", locked: false, class: "square" },
      { id: 6, value: "", locked: false, class: "square" },
      { id: 7, value: "", locked: false, class: "square" },
      { id: 8, value: "", locked: false, class: "square" },
    ]);
    setDoesWinnerExist(false);
    setIsDraw(false);
  }


  //funcionalidade de histórico do jogo
  const [history, setHistory] = useState([])
  // const [moveCounter, setMoveCounter] = useState(0)

  //sempre que o jogo mudar, atualize o histórico
  useEffect(() =>{
    // setMoveCounter(counter => counter + 1)
    setHistory(currentHistory => {
      return [...currentHistory, squares]
    })
  }, [squares])

  return (
    <div>
      <Board squares={squares} handleSquareClick={handleSquareClick} />
      {/* <GameHistory history={history}/> */}
      <button onClick={reStart} className="commom-button">
        Restart
      </button>
    </div>
  );
}
