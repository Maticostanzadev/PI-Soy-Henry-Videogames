require('dotenv').config();
const axios = require('axios');
const { Videogame, Genre, Platform, Op } = require('../db');
const { API_KEY } = process.env;

async function createGame({ name, description, genres, platforms, release_date, rating, background_image }) {
  try {
    if (!name || !description || platforms.length === 0) return { msgError: "Los campos name, description y platforms son obligatorios" };
    if (genres.length === 0) return { msgError: "El juego debe contener al menos un género" }

    const [game, created] = await Videogame.findOrCreate({
      where: { name },
      defaults: {
        description,
        release_date,
        rating,
        background_image,
      }
    });

    if (!created) {
      return { msg: "El videojuego ya existe" }
    }

    game.addGenres(genres);
    game.addPlatforms(platforms)

    return { msg: "El videojuego se ha creado con éxito" }
  }
  catch (e) {
    return { msgError: "Hubo un error al intentar crear el videojuego" }
  }
}

module.exports = {
  createGame
}