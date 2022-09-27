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
          <option className="filterOptions" selected={filtersApplied.genres === "none" ? true : false} disabled>--Género--</option>
          <option className="filterOptions" value="All" name="All" selected={filtersApplied.genres === "All" ? true : false} >Todos</option>
          {allGenres?.map(genre => (
            <option className="filterOptions" key={genre.id} value={genre.name} name={genre.name} selected={filtersApplied.genres === genre.name ? true : false} >{genre.name}</option>
          ))}
        </select>
      </div>
      {/* ------------------------------ END GENRES ----------------------------- */}

      {/* ------------------------------- CREATED ------------------------------- */}
      <div className="filterContainer">
        <select className="filterSelect" name="created" onChange={handleFilterCreated}>
          <option className="filterOptions" selected={filtersApplied.created === "none" ? true : false} disabled>--Origen--</option>
          <option className="filterOptions" value="All" name="All" selected={filtersApplied.created === "All" ? true : false}>Todos</option>
          <option className="filterOptions" value="DB" name="DB" selected={filtersApplied.created === "DB" ? true : false}>Base de datos</option>
          <option className="filterOptions" value="API" name="API" selected={filtersApplied.created === "API" ? true : false}>API externa</option>
        </select>
      </div>
      {/* ---------------------------- END CREATED ----------------------------- */}

      {/* -------------------------------- SORT -------------------------------- */}
      <div className="filterContainer">
        <select className="filterSelect" name="orderName" onChange={handleSortGames}>
          <option className="filterOptions" selected={filtersApplied.sort === "none" ? true : false} disabled>--Ordenar--</option>
          <option className="filterOptions" value="nameAsc" name="asc" selected={filtersApplied.sort === "nameAsc" ? true : false}>Nombre A-Z</option>
          <option className="filterOptions" value="nameDesc" name="desc" selected={filtersApplied.sort === "nameDesc" ? true : false}>Nombre Z-A</option>
          <option className="filterOptions" value="ratingAsc" name="asc" selected={filtersApplied.sort === "ratingAsc" ? true : false}>Rating -- ++</option>
          <option className="filterOptions" value="ratingDesc" name="desc" selected={filtersApplied.sort === "ratingDesc" ? true : false}>Rating ++ --</option>
        </select>
      </div>
      {/* ------------------------------ END SORT ------------------------------ */}
      {/* ------------------------------ END FILTERS ----------------------------- */}
    </div>
  )
}