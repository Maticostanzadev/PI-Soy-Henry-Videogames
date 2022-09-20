import React, { useState } from "react";
import { useDispatch } from "react-redux"
import './searchBar.css';
import { getGames } from "../../redux/actions";

export default function SearchBar() {

  // let stateGames = useSelector(state => state.allGames)

  const [inp, setInp] = useState('');
  let dispatch = useDispatch()

  function onChange(e) {
    setInp(e.target.value)
  }

  function onSubmit(e) {
    e.preventDefault();
    if (inp.length > 0) {
      dispatch(getGames(inp))
      setInp('')
    } else {
      alert("Debes escribir algo para buscar")
    }
  }

  console.log(inp)
  return (
    <div className="searchContainer">
      <form onSubmit={onSubmit} className="form">
        <input name='game' type='text' onChange={onChange} value={inp} placeholder="Inserte un videojuego" ></input>
        <button type="submit">BUSCAR</button>
      </form>
    </div>
  )
}

// <i class="fa-solid fa-magnifying-glass">BUSCAR</i>