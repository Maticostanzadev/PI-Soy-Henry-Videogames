import React from "react"
import { useDispatch } from "react-redux"
import { getGames } from '../../redux/actions'

export default function CardsRecharge() {

  let dispatch = useDispatch()

  function onClick(e) {
    e.preventDefault()
    dispatch(getGames())
  }

  return (
    <button onClick={onClick}>Volver a cargar todos los juegos</button>
  )
}