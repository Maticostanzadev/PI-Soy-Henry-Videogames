import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getGameDetails, resetCreate, resetGameDetail } from '../../redux/actions'
import './details.css'
import Loader from '../Loader/Loader'
import Warning from '../Warning/Warning'

export default function Details() {

  let gameDetails = useSelector(state => state.gameDetails)
  let dispatch = useDispatch()
  let { id } = useParams()

  useEffect(() => {
    dispatch(resetGameDetail())
    dispatch(getGameDetails(id))
  }, [id, dispatch])

  const { name, background_image, Genres, description, release_date, rating, platforms } = gameDetails

  return (
    <div className="totalDetailContainer">
      {gameDetails.name
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
                <p className="detailDescription"><span>Descripción:</span> {`${description.slice(0, 1700)}...`}</p>
              </div>
            </div>
          </div>
        </div>
        : gameDetails.msgError
          ? <div className="detailsWarning"><Warning message={gameDetails.msgError} /></div>
          : <Loader />}
      {gameDetails.msgError || gameDetails.name
        ? <Link to="/videogames">
          <p className="backButton">TODOS LOS JUEGOS</p>
        </Link>
        : <></>
      }
    </div>
  )
}