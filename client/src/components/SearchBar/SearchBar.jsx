import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import './searchBar.css';
import { getGames, sortGames, resetGames } from "../../redux/actions";
import { useEffect } from "react";

export default function SearchBar() {

  const { filtersApplied, allGames } = useSelector(state => state)
  const [inp, setInp] = useState('');
  let dispatch = useDispatch()

  function onChange(e) {
    setInp(e.target.value)
  }

  useEffect(() => {
    if (filtersApplied.sort !== "none" && allGames.length) {
      dispatch(sortGames(filtersApplied.sort))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allGames])

  function onSubmit(e) {
    e.preventDefault();
    dispatch(resetGames())
    if (inp.length > 0) {
      dispatch(getGames(inp))
      setInp('')
    } else {
      alert("Debes escribir algo para buscar")
    }
  }

  return (
    <form className="searchContainer" onSubmit={onSubmit}>
      <input className="searchInput" name='game' type='text' onChange={onChange} value={inp} placeholder="Inserte un videojuego" ></input>
      <button className="searchButton" type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  )
}