import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getGameDetails } from '../../redux/actions'
import './details.css'

export default function Details() {
  //Pedir estado a redux
  let stateGameDetails = useSelector(state => state.gameDetails)
  let dispatch = useDispatch()
  let { id } = useParams()
  console.log("id=" + id)
  console.log(stateGameDetails)

  useEffect(() => {
    dispatch(getGameDetails(id))
  }, [id, dispatch])

  const { name, background_image, Genres, description, release_date, rating, platforms } = stateGameDetails

  return (
    <div className="cardsContainer">
      <Link to="/videogames">
        <h1>VOLVER A LA PÁGINA INICIAL</h1>
      </Link>
      {stateGameDetails.name
        ?
        <div>
          <h1>HOLAHOLAHOLA</h1>
          <img src={background_image} alt="Imagen" />
          <h1>{name}</h1>
          <div>{Genres.map(g => g.name)}</div>
          <div>{platforms.map(p => p.name)}</div>
          <p>{description}</p>
          <p>{release_date}</p>
          <p>{rating}</p>
        </div>
        : stateGameDetails.msg
          ? <h1>No se encontraron juegos con ese id</h1>
          : <h1>Todavía estamos buscando</h1>}
    </div>
  )
}