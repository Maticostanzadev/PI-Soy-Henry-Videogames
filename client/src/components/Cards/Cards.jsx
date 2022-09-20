import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Card from '../Card/Card'
import Paginated from "../Paginated/Paginated"
import { Link } from "react-router-dom"
import { getGames } from '../../redux/actions'
import './cards.css'

export default function Cards() {
  //Pedir estado a redux
  let stateGames = useSelector(state => state.allGames)
  let dispatch = useDispatch()

  useEffect(() => {
    if (stateGames.length === 0) {
      dispatch(getGames())
    }
  }, [dispatch, stateGames.length])

  //------------- PAGINATED ------------

  const [currentPage, setCurrentPage] = useState(1)
  const [gamesPerPage, setGamesPerPage] = useState(15)
  const indexLastGame = currentPage * gamesPerPage
  const indexFirstGame = indexLastGame - gamesPerPage
  const currentGames = stateGames.slice(indexFirstGame, indexLastGame)
  const allGames = stateGames.length

  function paginated(number) {
    setCurrentPage(number)
  }

  function next() {
    if (currentPage < (allGames / gamesPerPage)) {
      let nextPage = currentPage + 1
      setCurrentPage(nextPage)
    }
  }

  function previous() {
    if (currentPage > 1) {
      let previousPage = currentPage - 1
      setCurrentPage(previousPage)
    }
  }

  console.log(currentPage)
  //------------- END PAGINATED ------------

  return (
    <div>
      <Paginated paginated={paginated} allGames={allGames} gamesPerPage={gamesPerPage} next={next} previous={previous} />
      <div className="cardsContainer">
        {currentGames.length
          ? currentGames.map(g =>
            <Link key={g.id} to={`/videogame/${g.id}`}>
              <Card
                // key={g.id}
                name={g.name}
                background_image={g.background_image}
                genres={g.genres}
              />
            </Link>
          )
          // ? <h1>Ya tenés la info disponible</h1>
          : <h1>Todavía estamos buscando</h1>}
      </div>
    </div>
  )
}