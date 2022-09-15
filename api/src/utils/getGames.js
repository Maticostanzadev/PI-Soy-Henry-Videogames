require('dotenv').config();
const axios = require('axios');
const { Videogame, Genre, Op } = require('../db');
const { API_KEY } = process.env;

async function getGamesApi(game) {
  let infoApi = []
  if (!game) {
    let url = `https://api.rawg.io/api/games?key=${API_KEY}`
    let page = 1
    while (page <= 5) {
      infoApiCurrent = await axios.get(url)
      infoApi = infoApi.concat(infoApiCurrent.data.results)
      url = infoApiCurrent.data.next
      page++
    }
  } else {
    let infoApiGames = await axios.get(`https://api.rawg.io/api/games?search=${game}&key=${API_KEY}`)
    infoApi = infoApiGames.data.results.slice(0, 15)
  }

  let infoSelected = infoApi.map(g => {
    // return g.name
    return {
      id: g.id,
      name: g.name,
      release_date: g.released,
      rating: g.rating,
      background_image: g.background_image,
      genres: g.genres.map(genre => {
        return {
          name: genre.name
        }
      }),
      platforms: g.platforms.map(p => {
        return {
          name: p.platform.name
        }
      })
    }
  })

  return infoSelected
}

async function getGamesDb(game) {
  let infoDb = []

  infoDb = await Videogame.findAll({
    attributes: ["background_image", "name"],
    where: game ? {
      name: {
        [Op.iLike]: `%${game}%`
      }
    } : {},
    include: {
      model: Genre,
      attributes: ["id", "name"],
      through: { attributes: [] }
    }
  })

  return infoDb
}

async function getGames(game) {
  try {
    let gamesApi = await getGamesApi(game);
    let gamesDb = await getGamesDb(game);

    gamesApi = gamesApi.map(game => {
      return {
        name: game.name,
        background_image: game.background_image,
        genres: game.genres
      }
    })
    // let games = gamesApi.concat(gamesDb);
    let games = gamesDb.concat(gamesApi);

    if (game && games.length === 0) return `No se encontraron juegos con el nombre: ${game}`;

    return games;
  }

  catch (e) {
    return { msgError: "Hubo un error al intentar obtener la información requerida" }
  }
}

module.exports = {
  getGamesApi,
  getGamesDb,
  getGames
}