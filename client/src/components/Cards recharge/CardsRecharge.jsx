import React from "react"
import { useDispatch } from "react-redux"
import { getGames, resetGames } from '../../redux/actions'
import './cardsRecharge.css'

export default function CardsRecharge() {

  let dispatch = useDispatch()

  function onClick(e) {
    e.preventDefault()
    dispatch(resetGames())
    dispatch(getGames())
  }

  return (
    <button className="rechargeButton" onClick={onClick}>Recargar juegos y filtros</button>
  )
}