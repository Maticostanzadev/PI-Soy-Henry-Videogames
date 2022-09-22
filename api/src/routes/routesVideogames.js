const { Router } = require('express');

// Traigo las funciones necesarias
const { getGames } = require('../utils/getGames')
const { createGame } = require('../utils/createGame')
const { getPlatforms } = require('../utils/getPlatforms')
const { getGenres } = require('../utils/getGenres')

const router = Router();

router.get('/', async (req, res) => {
  const { game } = req.query

  let games = await getGames(game)

  let statusCode
  games.msgError ? statusCode = 400 : statusCode = 200

  res.status(statusCode).json(games)
})

router.post("/", async (req, res) => {
  const game = await createGame(req.body);

  let statusCode
  game.msgError ? statusCode = 400 : statusCode = 200

  res.status(statusCode).json(game)
});

module.exports = router;