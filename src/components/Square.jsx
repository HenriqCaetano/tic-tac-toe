import React from "react";

export default function Square({ classString, handleClick, value, id }) {
  return (
    <button className={classString} onClick={() => handleClick(id)}>
      {value}
    </button>
  );
}
