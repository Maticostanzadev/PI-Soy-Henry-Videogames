require('dotenv').config();
const axios = require('axios');
const { Videogame, Genre, Op } = require('../db');
const { API_KEY } = process.env;

async function getGenresApi() {
  let genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)

  let genres = genresApi.data.results.map(g => {
    return {
      name: g.name
    }
  })

  return genres
}

async function getGenres() {
  try {
    let genresDb = await Genre.findAll();

    if (genresDb.length === 0) {
      let toCreate = await getGenresApi()

      await Genre.bulkCreate(toCreate)
    }

    return await Genre.findAll()
  }

  catch (e) {
    return { msgError: "Hubo un error al intentar obtener la información requerida" }
  }
}

module.exports = {
  getGenresApi,
  getGenres
}