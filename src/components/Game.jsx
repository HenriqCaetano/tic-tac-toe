import { GameHistory } from "./GameHistory.jsx";
import React, { useEffect, useState } from "react";
import Board from "./Board";

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

  //função que atualiza o jogo
  function handleSquareClick(id) {
    //atualiza os quadrados
    if (!squares[id].locked) {
      setMoveCounter((currentCounter) => {
        if (isReversed) {
          return [currentCounter.length, ...currentCounter];
        }
        return [...currentCounter, currentCounter.length];
      });
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
    // console.log(history);
  }

  //verifica se houve vencedor sempre que o jogo muda
  useEffect(() => {
    //verifica se há vencedor
    const getWinnerSquares = () => {
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
    };
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
  }, [squares, doesWinnerExist, isDraw]);

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
    setMoveCounter([0]);
    setHistory([]);
  }

  //funcionalidade de histórico do jogo
  const [history, setHistory] = useState([]);
  const [moveCounter, setMoveCounter] = useState([0]);

  //sempre que o jogo mudar, atualize o histórico

  useEffect(() => {
    setHistory((currentHistory) => {
      if (!currentHistory.includes(squares)) {
        return [...currentHistory, squares];
      }
      return [...currentHistory];
    });
  }, [squares]);

  function moveInHistory(move) {
    setSquares(history[move]);
    setHistory((currentHistory) => currentHistory.slice(0, move + 1));

    isReversed
      ? setMoveCounter((currentCounter) => {
          let aux = [...currentCounter];
          return aux
            .reverse()
            .slice(0, move + 1)
            .reverse();
        })
      : setMoveCounter((currentCounter) => currentCounter.slice(0, move + 1));
  }

  const [isReversed, setIsReversed] = useState(false);
  //tem que mudar isso aqui...
  function toggleHistoryOrder() {
    setIsReversed(!isReversed);

    setMoveCounter((currentCounter) => {
      let aux = [...currentCounter];
      return aux.reverse();
    });
  }

  //adicionar clique do botão para fazer o jogo voltar
  return (
    <div>
      <Board squares={squares} handleSquareClick={handleSquareClick} />
      <GameHistory
        moveCounter={moveCounter}
        moveInHistory={moveInHistory}
        toggleHistoryOrder={toggleHistoryOrder}
      />
      <button onClick={reStart} className="commom-button">
        Restart
      </button>
    </div>
  );
}
