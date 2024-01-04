import React from 'react'

export default function GameHistory({history}) {

console.log(history);    

  return (
    <div>
        {/* {history.map(entry =>{
            return <button key={entry[0].id}>hello</button>
        })} */}
        <button>{history}</button>
    </div>
  )
}
