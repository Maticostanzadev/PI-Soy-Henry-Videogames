import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { filterByGenres, filterByCreated, sortGames } from '../../redux/actions'
import './filters.css'
export default function Filters() {
  //Pedir estado a redux
  let { allGenres, filtersApplied } = useSelector(state => state)
  let dispatch = useDispatch()

  //-------------- FILTERS - SORT --------------

  const [sortState, setSortState] = useState(filtersApplied.sort)

  function handleFilterGenres(e) {
    dispatch(filterByGenres(e.target.value))
    if (sortState !== "none") {
      dispatch(sortGames(sortState))
    }
  }

  function handleFilterCreated(e) {
    dispatch(filterByCreated(e.target.value))
    if (sortState !== "none") {
      dispatch(sortGames(sortState))
    }
  }

  function handleSortGames(e) {
    dispatch(sortGames(e.target.value))
    setSortState(e.target.value)
  }

  return (
    <div className="filtersContainer">
      {/* -------------------------------- FILTERS ------------------------------- */}
      {/* ------------------------------- GENRES ------------------------------- */}
      <div className="filterContainer">
        <select className="filterSelect" name="genres" id="genres" onChange={handleFilterGenres}>
          <option className="filterOptions" selected disabled>--Género--</option>
          <option className="filterOptions" value="All" name="All">Todos</option>
          {allGenres?.map(genre => (
            <option className="filterOptions" key={genre.id} value={genre.name} name={genre.name}>{genre.name}</option>
          ))}
        </select>
      </div>
      {/* ------------------------------ END GENRES ----------------------------- */}

      {/* ------------------------------- CREATED ------------------------------- */}
      <div className="filterContainer">
        <select className="filterSelect" name="created" onChange={handleFilterCreated}>
          <option className="filterOptions" selected disabled>--Origen--</option>
          <option className="filterOptions" value="All" name="All">Todos</option>
          <option className="filterOptions" value="DB" name="DB">Base de datos</option>
          <option className="filterOptions" value="API" name="API">API externa</option>
        </select>
      </div>
      {/* ---------------------------- END CREATED ----------------------------- */}

      {/* -------------------------------- SORT -------------------------------- */}
      <div className="filterContainer">
        <select className="filterSelect" name="orderName" onChange={handleSortGames}>
          <option className="filterOptions" selected disabled>--Ordenar--</option>
          <option className="filterOptions" value="nameAsc" name="asc">Nombre A-Z</option>
          <option className="filterOptions" value="nameDesc" name="desc">Nombre Z-A</option>
          <option className="filterOptions" value="ratingAsc" name="asc">Rating -- ++</option>
          <option className="filterOptions" value="ratingDesc" name="desc">Rating ++ --</option>
        </select>
      </div>
      {/* ------------------------------ END SORT ------------------------------ */}
      {/* ------------------------------ END FILTERS ----------------------------- */}
    </div>
  )
}