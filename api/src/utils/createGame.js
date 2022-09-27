require('dotenv').config();
const { Videogame } = require('../db');

async function createGame({ name, description, genres, platforms, release_date, rating, background_image }) {
  try {

    if (!name || !description || platforms.length === 0) return { msgError: "Los campos name, description y platforms son obligatorios" };
    if (genres.length === 0) return { msgError: "EL JUEGO DEBE CONTENER AL MENOS UN GÉNERO, POR FAVOR AGRÉGALO Y VUELVE A INTENTAR!" }
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
      return { msgError: "YA EXISTE UN VIDEOJUEGO CON ESE NOMBRE, POR FAVOR ELIJA OTRO Y VUELVA A INTENTAR!" }
    }

    game.addGenres(genres);

    return { msg: "EL VIDEOJUEGO SE HA CREADO CON ÉXITO, PUEDES VERLO EN LA PÁGINA PRINCIPAL!" }
  }
  catch (e) {
    return { msgError: "LO LAMENTAMOS, HUBO UN ERROR AL INTENTAR CREAR EL VIDEOJUEGO!" }
  }
}

module.exports = {
  createGame
}