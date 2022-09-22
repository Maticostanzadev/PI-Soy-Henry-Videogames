import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGame, getGenres, getPlatforms } from '../../redux/actions';
import './create.css'

export default function Create() {

  const allGenres = useSelector(state => state.allGenres)
  const allPlatforms = useSelector(state => state.allPlatforms)
  const dispatch = useDispatch()

  const [buttonDisabled /*, setButtonDisabled*/] = useState(false)
  const [errors, setErrors] = useState({})

  const [game, setGame] = useState({
    name: "",
    description: "",
    release_date: "",
    rating: 5,
    background_image: "",
    genres: [],
    platforms: [],
  })

  useEffect(() => {
    if (!allGenres.length) {
      dispatch(getGenres())
    }
  }, [dispatch, allGenres])

  useEffect(() => {
    if (!allPlatforms.length) {
      dispatch(getPlatforms())
    }
  }, [dispatch, allPlatforms])

  //------------------------ Validation ------------------------//

  const regexName = /^[a-zA-Z0-9-() .]{4,50}$/ //Letras minúsculas y mayúsculas, números, guión, paréntesis, espacio y punto, entre 4 y 50.
  const regexDecimal = /^\d{1}(\.\d{1,2})?$/ //Un solo dígito entre 0 y 5, posibilidad de agregar 1 o 2 decimales.
  const regexUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#()?&//=]*)/


  function validate(data) {
    let error = {}

    if (!data.name) {
      error.name = "Es obligatorio agregar un nombre."
    } else if (data.name && !regexName.test(data.name)) {
      error.name = "El nombre debe contener entre 4 y 50 caracteres (letras, números, guión medio, paréntesis, espacios y puntos)."
    }

    if (data.description.length > 2000) {
      error.description = "La descripción debe contener máximo 2000 caracteres."
    }

    if (data.rating) {
      if (data.rating < 0 || data.rating > 5) {
        error.rating = "El rating debe ser mayor que 0 y menor que 5."
      } else if (!regexDecimal.test(data.rating)) {
        error.rating = "El rating puede tener como máximo 2 decimales"
      }
    }

    if (data.background_image && !regexUrl.test(data.background_image)) {
      error.background_image = "La imagen debe ser una URL válida."
    }

    console.log(error.background_image)
    setErrors(error)
  }

  useEffect(() => {
    if (!allGenres.length || !allPlatforms.length) return;
    validate(game)
  }, [game])
  //---------------------- END Validation ----------------------//

  function onChange(e) {
    setGame({
      ...game,
      [e.target.name]: e.target.value,
    })
  }

  //---------------------- Genres functions ----------------------//
  function handleGenres(e) {
    let id = parseInt(e.target.value)
    if (!game.genres.includes(id)) {
      setGame({
        ...game,
        genres: [...game.genres, id]
      })
    }
  }

  function deleteGenre(id) {
    setGame({
      ...game,
      genres: game.genres.filter(g => g !== id)
    })
  }
  //---------------------- END Genres functions ----------------------//
  //---------------------- Platforms functions ----------------------//
  function handlePlatforms(e) {
    if (!game.platforms.includes(e.target.value)) {
      setGame({
        ...game,
        platforms: [...game.platforms, e.target.value]
      })
    }
  }

  function deletePlatform(name) {
    setGame({
      ...game,
      platforms: game.platforms.filter(p => p !== name)
    })
  }
  //---------------------- END Platforms functions ----------------------//
  function onSubmit(e) {
    e.preventDefault();
    dispatch(createGame(game))
    alert("Videojuego creado con éxito")
    setGame({
      name: "",
      description: "",
      release_date: "",
      rating: 0,
      background_image: "",
      genres: [],
      platforms: [],
    })
  }

  return (
    <div className="createContainer">
      <form className="createForm" onSubmit={onSubmit}>
        <div className="sectionContainers">
          <div>
            <label>Nombre</label>
            <input className={errors.name ? "errorInput" : "createInput"} type="text" name="name" value={game.name} onChange={onChange} />
          </div>
          {errors.name ? <p className="errorText">{errors.name}</p> : ""}
        </div>

        {/* --------------- */}

        <div className="sectionContainers">
          <label>Descripción</label>
          <input className={errors.description ? "errorInput" : "createInput"} type="text" name="description" value={game.description} onChange={onChange}></input>
          {errors.description ? <p className="errorText">{errors.description}</p> : ""}
        </div>

        {/* --------------- */}

        <div className="sectionContainers">
          <label>Fecha de lanzamiento</label>
          <input className="createInput" type="date" name="release_date" value={game.release_date} onChange={onChange}></input>
        </div>

        {/* --------------- */}

        <div className="sectionContainers">
          <label>Rating</label>
          <input className={errors.rating ? "errorInput" : "createInput"} type="number" name="rating" value={game.rating} onChange={onChange}></input>
          {errors.rating ? <p className="errorText">{errors.rating}</p> : ""}
        </div>

        {/* --------------- */}

        <div className="sectionContainers">
          <label>Imagen</label>
          <input className={errors.background_image ? "errorInput" : "createInput"} name="background_image" value={game.background_image} onChange={onChange}></input>
          {errors.background_image ? <p className="errorText">{errors.background_image}</p> : ""}
          <p>Previsualización de la imagen:</p>
          {game.background_image
            ? <img src={game.background_image} alt="Imagen del juego" />
            : <img src="https://i.ibb.co/hZL7KR3/Imagen-No-Disponible.png" alt="Imagen del juego" />
          }
        </div>
        {/* --------------- */}

        <div className="pgContainer">
          <label>Géneros</label>
          <div className="inputComplete">
            <select className="createSelect" name="genres" value="0" onChange={handleGenres}>
              <option value="0">Añadir géneros</option>
              {allGenres?.map(genre => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
              ))}
            </select>
          </div>
          {game.genres?.map(genre => (
            <div key={genre}>
              <h3>{allGenres.find(g => g.id === genre).name}</h3>
              <button onClick={() => deleteGenre(genre)}>Eliminar</button>
            </div>
          ))}
        </div>

        {/* --------------- */}

        <div className="pgContainer">
          <label>Plataformas</label>
          <div className="inputComplete">
            <select className="createSelect" name="platforms" value="0" onChange={handlePlatforms}>
              <option value="0">Añadir plataformas</option>
              {allPlatforms?.map(platform => (
                <option key={platform.id} value={platform.name}>{platform.name}</option>
              ))}
            </select>
          </div>
          {game.platforms?.map(p => (
            <div key={p}>
              <h3>{p}</h3>
              <button onClick={() => deletePlatform(p)}>Eliminar</button>
            </div>
          ))}
        </div>

        {/* --------------- */}

        <button disabled={buttonDisabled}>Agregar juego</button>
      </form >
    </div >
  )


}
