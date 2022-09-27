import React from "react"
import './paginated.css'

export default function Paginated({ paginated, gamesPerPage, allGames, next, previous }) {

  const pages = []

  for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {
    pages.push(i)
  }

  return (
    <div className="pagContainer">
      {pages.length
        ? <div className="buttonContainer">
          <button className="pButton" onClick={() => previous()} >ANTERIOR</button>
          {pages.map(page => (
            <button className="numButton" onClick={() => paginated(page)} key={page} >{page}</button>
          ))}
          <button className="nButton" onClick={() => next()} >SIGUIENTE</button>
        </div>
        : <></>
      }
    </div>
  )
}