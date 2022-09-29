require('dotenv').config();
const { Videogame } = require('../db');

async function createGame({ name, description, genres, platforms, release_date, rating, background_image }) {
  try {

    if (!name || !description || platforms.length === 0) return { msgError: "Los campos name, description y platforms son obligatorios" };
    if (genres.length === 0) return { msgError: "El juego debe tener al menos un género, por favor agrégalo y vuelva a intentar" }
    if (!background_image) background_image = "https://i.ibb.co/hZL7KR3/Imagen-No-Disponible.png"

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
      return { msgError: "Ya existe un videojuego con ese nombre, por favor elija otro y vuelva a intentar!" }
    }

    game.addGenres(genres);

    return { msg: "El videojuego se ha agregado con éxito, dirígite a la página principal para verlo!" }
  }
  catch (e) {
    return { msgError: "Lo lamentamos, hubo un error al intentar crear el videojuego!" }
  }
}

module.exports = {
  createGame
}