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
        ? <div>
          <button className="npButton" onClick={() => previous()} >PREVIOUS</button>
          {pages.map(page => (
            <button className="numButton" onClick={() => paginated(page)} key={page} >{page}</button>
          ))}
          <button className="npButton" onClick={() => next()} >NEXT</button>
        </div>
        : <></>
      }
    </div>
  )
}