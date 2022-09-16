require('dotenv').config();
const { Videogame } = require('../db');

async function createGame({ name, description, genres, platforms, release_date, rating, background_image }) {
  try {
    let urlValidate = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/

    if (!name || !description || platforms.length === 0) return { msgError: "Los campos name, description y platforms son obligatorios" };
    if (genres.length === 0) return { msgError: "El juego debe contener al menos un género" }
    if (background_image && !urlValidate.test(background_image)) return { msgError: "El campo de imagen debe ser una URL" }

    const [game, created] = await Videogame.findOrCreate({
      where: { name },
      defaults: {
        description,
        release_date,
        rating,
        background_image,
        platforms
      }
    });

    if (!created) {
      return { msg: "El videojuego ya existe" }
    }

    game.addGenres(genres);

    return { msg: "El videojuego se ha creado con éxito" }
  }
  catch (e) {
    return { msgError: "Hubo un error al intentar crear el videojuego" }
  }
}

module.exports = {
  createGame
}