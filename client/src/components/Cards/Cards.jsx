import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Card from '../Card/Card'
import Paginated from "../Paginated/Paginated"
import { Link } from "react-router-dom"
import { getGames, setPage, getGenres } from '../../redux/actions'
import './cards.css'

export default function Cards() {
  //Pedir estado a redux
  let { allGames, filteredGames, currentPage } = useSelector(state => state)
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

  useEffect(() => {
    if (!allGames.length) {
      dispatch(getGames())
    }
  }, [dispatch, allGames])

  //------------- PAGINATED ------------

  const [gamesPerPage] = useState(15)
  const indexLastGame = currentPage * gamesPerPage
  const indexFirstGame = indexLastGame - gamesPerPage
  const currentGames = filteredGames.slice(indexFirstGame, indexLastGame)
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
    <div>
      {/* --------------------------- PAGINATED -------------------------- */}
      <div className="totalContainer">
        <Paginated paginated={paginated} allGames={filteredGamesLength} gamesPerPage={gamesPerPage} next={next} previous={previous} />
      </div>
      {/* ------------------------- END PAGINATED ------------------------ */}

      {/* ----------------------------- CARDS ---------------------------- */}
      <div className="cardsContainer">
        {currentGames.length
          ? currentGames?.map(g =>
            <Link key={g.id} to={`/videogame/${g.id}`}>
              <Card
                name={g.name}
                background_image={g.background_image}
                genres={g.genres}
                rating={g.rating}
              />
            </Link>
          )
          : allGames.length
            ? <h1>No se encontraron juegos con esos filtros.</h1>
            : <h1>Todavía estamos buscando.</h1>}
      </div>
      {/* --------------------------- END CARDS -------------------------- */}
    </div>
  )
}