/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGame, getGenres, getPlatforms, resetCreate, resetGames } from '../../redux/actions';
import './create.css'

export default function Create() {

  const { allGenres, allPlatforms, gameCreated } = useSelector(state => state)

  const dispatch = useDispatch()

  const [buttonDisabled, setButtonDisabled] = useState(true)
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
    dispatch(resetCreate())
    dispatch(resetGames())
    if (!allGenres.length) {
      dispatch(getGenres())
    }
  }, [])

  useEffect(() => {
    dispatch(getPlatforms())
  }, [])

  //------------------------ Validation ------------------------//

  const regexName = /^[a-zA-ZÀ-ÿ\u00f1\u00d10-9-() .]{4,50}$/ //Letras minúsculas y mayúsculas, números, guión, paréntesis, espacio y punto, entre 4 y 50.
  const regexDecimal = /^\d{1}(\.\d{1,2})?$/ //Un solo dígito entre 0 y 5, posibilidad de agregar 1 o 2 decimales.
  const regexUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#()?&//=]*)/

  function validate(data) {
    let error = {}

    if (!data.name) {
      error.name = "Es obligatorio agregar un nombre."
    } else if (data.name.length < 4 || data.name.length > 50) {
      error.name = "El nombre debe contener entre 4 y 50 caracteres"
    } else if (data.name && !regexName.test(data.name)) {
      error.name = "Solo se admiten letras, números, guión medio, paréntesis, espacios y puntos."
    }

    if (!data.description) {
      error.description = "Es obligatorio agregar una descripción."
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

    if (!data.platforms.length) {
      error.platforms = "Es obligatorio agregar al menos una plataforma."
    }

    if (data.background_image && !regexUrl.test(data.background_image)) {
      error.background_image = "La imagen debe ser una URL válida."
    }

    setErrors(error)
  }

  useEffect(() => {
    if (!allGenres.length || !allPlatforms.length) return;
    validate(game)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game])

  useEffect(() => {
    if (!allGenres.length || !allPlatforms.length) return;
    if (!Object.keys(errors).length) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors])
  //---------------------- END Validation ----------------------//
  //---------------------- Genres functions ----------------------//
  function handleGenres(e) {
    let id = parseInt(e.target.value)
    if (!game.genres.includes(id) && game.genres.length < 6) {
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
    if (!game.platforms.includes(e.target.value) && game.platforms.length < 8) {
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
  function onChange(e) {
    setGame({
      ...game,
      [e.target.name]: e.target.value,
    })
  }

  function onSubmit(e) {
    e.preventDefault();
    dispatch(createGame(game))
  }

  useEffect(() => {
    if (gameCreated.msgError) {
      alert(gameCreated.msgError)
      dispatch(resetCreate())
    }

    if (gameCreated.msg) {
      alert(gameCreated.msg)
      dispatch(resetCreate())
      setGame({
        name: "",
        description: "",
        release_date: "",
        rating: 5,
        background_image: "",
        genres: [],
        platforms: [],
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameCreated])

  return (
    <div className="createContainer">
      <form className="createForm" onSubmit={onSubmit}>
        <div className="createPanels">
          <div className="leftForm leftRightForm">
            <div className="inputGroup">
              <input className={errors.name ? "errorInput" : "createInput"} type="text" name="name" value={game.name} onChange={onChange} />
              <label className={errors.name ? "errorLabel" : "inputLabel"}>Nombre</label>
              {errors.name ? <p className="errorText"><i className="fa-solid fa-circle-exclamation"></i>{errors.name}</p> : ""}
            </div>

            {/* --------------- */}

            <div className="inputGroup">
              <input className="createInput" type="date" name="release_date" value={game.release_date} onChange={onChange}></input>
              <label className="inputLabel">Fecha de lanzamiento</label>
            </div>

            {/* --------------- */}

            <div className="inputGroup">
              <input className={errors.rating ? "errorInput" : "createInput"} type="number" name="rating" value={game.rating} onChange={onChange}></input>
              <label className={errors.rating ? "errorLabel" : "inputLabel"}>Rating</label>
              {errors.rating ? <p className="errorText"><i className="fa-solid fa-circle-exclamation"></i>{errors.rating}</p> : ""}
            </div>

            {/* --------------- */}

            <div className="inputGroup">
              <textarea className={errors.description
                ? "errorInput"
                : "createInput"}
                rows="15" name="description" value={game.description} onChange={onChange}>
              </textarea>
              <label className={errors.description ? "errorLabel" : "inputLabel"}>Descripción</label>
              {errors.description ? <p className="errorText"><i className="fa-solid fa-circle-exclamation"></i>{errors.description}</p> : ""}
            </div>
          </div>
          {/* --------------- */}
          <div className="rightForm leftRightForm">
            {/* --------------- */}
            <div className="twoSelects">
              <div className="inputGroup createInput totalSelect totalSelectL">
                <div className="inputSelect isLeft">
                  <label className="inputLabel">Géneros</label>
                  <select className="createSelect" name="genres" value="0" onChange={handleGenres}>
                    <option selected disabled value="0">Añadir géneros</option>
                    {allGenres?.map(genre => (
                      <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                  </select>
                </div>
                <div className="selecteds">
                  {game.genres?.map(genre => (
                    <p className="oneSelected" key={genre}>{allGenres.find(g => g.id === genre).name} <i onClick={() => deleteGenre(genre)} className="fa-solid fa-square-xmark"></i></p>
                  ))}
                </div>
              </div>

              {/* --------------- */}

              <div className={errors.platforms ? `inputGroup createInput totalSelectRError totalSelectR` : `inputGroup createInput totalSelect totalSelectR`}>
                <div className="inputSelect isRight">
                  <label className={errors.platforms ? "errorLabel" : "inputLabel"}>Plataformas</label>
                  <select className="createSelect" name="platforms" value="0" onChange={handlePlatforms}>
                    <option selected disabled value="0">Añadir plataformas</option>
                    {allPlatforms?.map(platform => (
                      <option key={platform.id} value={platform.name}>{platform.name}</option>
                    ))}
                  </select>
                </div>
                <div className="selecteds">
                  {game.platforms?.map(p => (
                    <p className="oneSelected" key={p}>{p} <i onClick={() => deletePlatform(p)} className="fa-solid fa-square-xmark"></i></p>
                  ))}
                </div>
                {errors.platforms ? <p className="errorText errorTextPlatform"><i className="fa-solid fa-circle-exclamation"></i>{errors.platforms}</p> : ""}
              </div>
            </div>
            <div className="inputGroup inputGroupImage">
              <div className="inputGroup">
                <input className={errors.background_image ? "errorInput" : "createInput"} name="background_image" value={game.background_image} onChange={onChange}></input>
                <label className={errors.background_image ? "errorLabel" : "inputLabel"}>Imagen</label>
                {errors.background_image ? <p className="errorText"><i className="fa-solid fa-circle-exclamation"></i>{errors.background_image}</p> : ""}
              </div>
              <div className="visual">
                <p>Previsualización de la imagen:</p>
                {game.background_image
                  ? <img src={game.background_image} alt="Imagen del juego" />
                  : <img src="https://i.ibb.co/hZL7KR3/Imagen-No-Disponible.png" alt="Imagen del juego" />
                }
              </div>
            </div>
            {/* --------------- */}
            <button className="createButton" disabled={buttonDisabled}>Agregar juego</button>
          </div>

        </div>
        {/* --------------- */}


      </form >
    </div >
  )
}
