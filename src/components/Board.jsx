import React from "react";
import Square from "./Square";

export default function Board({ squares, handleSquareClick }) {
  const board = squares.map((square) => {
    return (
      <Square
        classString={square.class}
        key={square.id}
        id={square.id}
        handleClick={handleSquareClick}
        value={square.value}
      />
    );
  });

  return <div className="board">{board}</div>;
}
