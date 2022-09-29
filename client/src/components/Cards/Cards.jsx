import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Card from '../Card/Card'
import Paginated from "../Paginated/Paginated"
import { Link } from "react-router-dom"
import { setPage } from '../../redux/actions'
import './cards.css'
import Loader from "../Loader/Loader"
import Warning from "../Warning/Warning"

export default function Cards() {

  let { allGames, filteredGames, currentPage } = useSelector(state => state)
  let dispatch = useDispatch()

  //------------- PAGINATED ------------

  const [gamesPerPage] = useState(15)
  const indexLastGame = currentPage * gamesPerPage
  const indexFirstGame = indexLastGame - gamesPerPage
  const currentGames = Array.isArray(filteredGames) ? filteredGames.slice(indexFirstGame, indexLastGame) : []
  const filteredGamesLength = filteredGames.length

  function paginated(page) {
    dispatch(setPage(page))
  }

  function next() {
    if (currentPage < (filteredGamesLength / gamesPerPage)) {
      let nextPage = currentPage + 1
      dispatch(setPage(nextPage))
    }
  }

  function previous(games) {
    if (currentPage > 1) {
      let previousPage = currentPage - 1
      dispatch(setPage(previousPage))
    }
  }

  //------------- END PAGINATED ------------

  return (
    <div className="totalContainer">
      {allGames.msgError
        ? <Warning message={allGames.msgError} />
        : currentGames.length
          ? <div className="cardsContainer">
            {currentGames.map(g =>
              <Link key={g.id} to={`/videogames/detail/${g.id}`}>
                <Card
                  name={g.name}
                  background_image={g.background_image}
                  genres={g.genres}
                  rating={g.rating}
                />
              </Link>
            )}
          </div>
          : allGames.length
            ? <Warning message="No se encontraron juegos con esos filtros" />
            : <Loader />}
      <Paginated paginated={paginated} allGames={filteredGamesLength} gamesPerPage={gamesPerPage} next={next} previous={previous} />
    </div>
  )
}