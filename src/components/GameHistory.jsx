import React from "react";


export function GameHistory({
  moveCounter,
  moveInHistory,
  toggleHistoryOrder
}) {
  return <>      <li>
        {moveCounter.map(move => {
        return <ul key={move}>
              <button onClick={() => moveInHistory(move)}>
                Go to move #{move}
              </button>
            </ul>;
      })}
      </li>
      <button onClick={toggleHistoryOrder}>Toggle History Order</button></>;
}
  