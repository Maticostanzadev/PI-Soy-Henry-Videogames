import React from "react"


export default function Paginated({ paginated, gamesPerPage, allGames, next, previous }) {

  const pages = []

  for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {
    pages.push(i)
  }

  return (
    <nav>
      <button onClick={() => next()} >NEXT</button>
      <ul>
        {pages.map(page => (
          <li key={page}>
            <button onClick={() => paginated(page)} >{page}</button>
          </li>
        ))}
      </ul>
      <button onClick={() => previous()} >PREVIOUS</button>
    </nav>
  )
}