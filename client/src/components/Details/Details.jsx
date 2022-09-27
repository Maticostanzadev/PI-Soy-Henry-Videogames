import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getGameDetails, resetCreate, resetGameDetail } from '../../redux/actions'
import './details.css'

export default function Details() {

  let GameDetails = useSelector(state => state.gameDetails)
  let dispatch = useDispatch()
  let { id } = useParams()

  useEffect(() => {
    dispatch(resetGameDetail())
    dispatch(resetCreate())
    dispatch(getGameDetails(id))
  }, [id, dispatch])

  const { name, background_image, Genres, description, release_date, rating, platforms } = GameDetails
  // if (description && description.length > 1800) {
  //   description.split(" ").slice(0, 10).join(" ")
  // }
  return (
    <div className="totalDetailContainer">
      {GameDetails.name
        ?
        <div className="detailContainer">
          <img src={background_image} alt="Imagen" />
          <div className="detailInfo">
            <div className="detailTop">
              <p className="detailReleased">{release_date}</p>
              <p className="detailRating">{rating}<i className="fa-solid fa-star"></i></p>
            </div>
            <h1 className="detailName">{name}</h1>
            <div className="detailCenter">
              <div className="detailsGroup">
                <div className="detailGenres"><span>Géneros:</span> {Genres.map(g => ` -${g.name}- `)}</div>
                <div className="detailPlatforms"><span>Plataformas:</span> {platforms.map(p => ` -${p}-  `)}</div>
                <p className="detailDescription"><span>Descripción:</span> {`${description.split(" ").slice(0, 250).join(" ")}...`}</p>
              </div>
            </div>
          </div>
        </div>
        : GameDetails.msgError
          ? <h1>No se encontraron juegos con ese id</h1>
          : <h1>Todavía estamos buscando</h1>}
      <Link to="/videogames">
        <p className="backButton">TODOS LOS JUEGOS</p>
      </Link>
    </div>
  )
}