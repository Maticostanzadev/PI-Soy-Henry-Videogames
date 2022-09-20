require('dotenv').config();
const axios = require('axios');
const { Videogame, Genre } = require('../db');
const { API_KEY } = process.env;

async function getGameDetailApi(idVideogame) {
  try {
    let gameDetailApi = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)

    gameDetailApi = gameDetailApi.data

    let gameDetail = {
      name: gameDetailApi.name,
      background_image: gameDetailApi.background_image,
      Genres: gameDetailApi.genres.map(g => {
        return g.name
      }),
      description: gameDetailApi.description_raw,
      release_date: gameDetailApi.released,
      rating: gameDetailApi.rating,
      platforms: gameDetailApi.platforms.map(p => {
        return p.platform.name
      })
    }

    return gameDetail
  }
  catch (e) {
    return { msgError: "No se encontraron juegos con ese ID" }
  }
}

async function getGameDetailDb(idVideogame) {
  try {
    let gameDetail = await Videogame.findByPk(idVideogame, {
      include: [
        {
          model: Genre,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      ]
    })

    return gameDetail
  }
  catch (e) {
    return { msgError: "No se encontraron juegos con ese ID" }
  }
}

async function getGameDetail(idVideogame) {
  try {
    let gameDetail
    if (!idVideogame.includes("-")) {
      gameDetail = await getGameDetailApi(idVideogame)
    } else {
      gameDetail = await getGameDetailDb(idVideogame)
    }

    return gameDetail
  }
  catch (e) {
    return { msgError: "Hubo un error al intentar obtener la información requerida" }
  }
}


module.exports = {
  getGameDetailApi,
  getGameDetailDb,
  getGameDetail
}





