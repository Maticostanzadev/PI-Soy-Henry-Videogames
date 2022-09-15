require('dotenv').config();
const { Router } = require('express');
const { Videogame, Genre } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;

// Me traigo las funciones:
const { getGames } = require('../utils/getGames')
const { createGame } = require('../utils/createGame')
const { getGenres } = require('../utils/getGenres')
const { getPlatforms } = require('../utils/getPlatforms')
const { getGameDetail } = require('../utils/getGameDetail')

// Me traigo todos los links
// urlGames = `https://api.rawg.io/api/games?key=${API_KEY}`
// urlGameDetail = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
// urlGamesName = `https://api.rawg.io/api/games?search=${game}&?key=${API_KEY}`
// urlGenres = `https://api.rawg.io/api/genres?key=${API_KEY}`

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const routesGenres = require('./routesGenres.js');
// const routesVideogameId = require('./routesVideogameId');
// const routesVideogames = require('./routesVideogames');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/genres', routesGenres);
// router.use('/videogame', routesVideogameId);
// router.use('/videogames', routesVideogames);

//---------------------------- ROUTES -------------------------------
router.get('/videogames', async (req, res) => {
  let platforms = await getPlatforms()
  let genres = await getGenres()

  const { game } = req.query

  let games = await getGames(game)

  let statusCode
  games.msgError ? statusCode = 400 : statusCode = 200

  res.status(statusCode).json(games)
})

router.get('/videogames/:id', async (req, res) => {
  const { id } = req.params;
  let detail = await getGameDetail(id)

  let statusCode
  detail.msgError ? statusCode = 400 : statusCode = 200

  res.status(statusCode).json(detail)
})

router.post("/videogames", async (req, res) => {
  const game = await createGame(req.body);

  let statusCode
  game.msgError ? statusCode = 400 : statusCode = 200

  res.status(statusCode).json(game)
});

router.get('/genres', async (req, res) => {
  let genres = await getGenres();

  let statusCode
  genres.msgError ? statusCode = 400 : statusCode = 200

  res.status(statusCode).json(genres)
})



router.get('/platforms', async (req, res) => {
  let response = await getPlatforms();

  res.json(response)
})


// router.get('/genres', (req, res) => { })

//---------------------------- ROUTES.END -----------------------------
module.exports = router;
