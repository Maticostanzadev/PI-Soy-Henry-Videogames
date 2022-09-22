import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Card from '../Card/Card'
import Paginated from "../Paginated/Paginated"
import { Link } from "react-router-dom"
import { getGames, setPage, getGenres, filterByGenres, filterByCreated, sortGames } from '../../redux/actions'
import './cards.css'

export default function Cards() {
  //Pedir estado a redux
  let { allGames, currentPage, allGenres, filtersApplied } = useSelector(state => state)
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

  useEffect(() => {
    dispatch(getGames())
  }, [dispatch])

  //-------------- FILTERS - SORT --------------
  const [filterGen, setFilterGen] = useState(filtersApplied.genres)

  console.log(filterGen)

  function handleFilterGenres(e) {
    dispatch(filterByGenres(e.target.value))
  }

  function handleFilterCreated(e) {
    dispatch(filterByCreated(e.target.value))
  }

  function handleSortName(e) {
    dispatch(sortGames(e.target.value))
  }

  function handleSortRating(e) {
    dispatch(sortGames(e.target.value))
  }

  //------------- PAGINATED ------------

  const [gamesPerPage] = useState(15)
  const indexLastGame = currentPage * gamesPerPage
  const indexFirstGame = indexLastGame - gamesPerPage
  const currentGames = allGames.slice(indexFirstGame, indexLastGame)
  const allGamesLength = allGames.length

  function paginated(page) {
    dispatch(setPage(page))
  }

  function next() {
    if (currentPage < (allGamesLength / gamesPerPage)) {
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
      {/* -------------------------------- FILTERS ------------------------------- */}
      <div>
        {/* -------------------------------- GENRES ------------------------------- */}
        <select className="filterSelect" name="genres" onChange={handleFilterGenres}>
          <option className="filterOptions" value="All" name="All">Todos los géneros</option>
          {allGenres?.map(genre => (
            <option key={genre.id} value={genre.name} name={genre.name}>{genre.name}</option>
          ))}
        </select>
        {/* -------------------------------- GENRES ------------------------------- */}
        {/* ------------------------------- CREATED ------------------------------- */}
        <select className="filterSelect" name="created" onChange={handleFilterCreated}>
          <option value="All" name="All">Todos los juegos</option>
          <option value="DB" name="DB">Base de datos</option>
          <option value="API" name="API">API externa</option>
        </select>
        {/* ------------------------------- CREATED ------------------------------- */}

        {/* ---------------------------- ORDER BY NAME ---------------------------- */}
        <select className="filterSelect" name="orderName" onChange={handleSortName}>
          <option value="default" name="default">Por defecto</option>
          <option value="asc" name="asc">Ascendente</option>
          <option value="desc" name="desc">Descendente</option>
        </select>
        {/* ---------------------------- ORDER BY NAME ---------------------------- */}

        {/* --------------------------- ORDER BY RATING --------------------------- */}
        <select className="filterSelect" name="orderRating" onChange={handleSortRating}>
          <option value="default" name="default">Por defecto</option>
          <option value="asc" name="asc">Ascendente</option>
          <option value="desc" name="desc">Descendente</option>
        </select>
        {/* --------------------------- ORDER BY RATING --------------------------- */}

      </div>
      {/* -------------------------------- FILTERS ------------------------------- */}
      {/* --------------------------- PAGINATED + CARDS -------------------------- */}
      <div className="totalContainer">
        <Paginated paginated={paginated} allGames={allGamesLength} gamesPerPage={gamesPerPage} next={next} previous={previous} />
        <div className="cardsContainer">
          {currentGames.length
            ? currentGames?.map(g =>
              <Link key={g.id} to={`/videogame/${g.id}`}>
                <Card
                  name={g.name}
                  background_image={g.background_image}
                  genres={g.genres}
                />
              </Link>
            )
            : <h1>Todavía estamos buscando</h1>}
        </div>
      </div>
      {/* --------------------------- PAGINATED + CARDS -------------------------- */}
    </div>
  )
}