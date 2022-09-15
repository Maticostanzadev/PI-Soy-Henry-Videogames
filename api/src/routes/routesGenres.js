const { Router } = require('express');

// Traigo las funciones necesarias
const { getGenres } = require('../utils/getGenres')

const router = Router();

router.get('/', async (req, res) => {
  let genres = await getGenres();

  let statusCode
  genres.msgError ? statusCode = 400 : statusCode = 200

  res.status(statusCode).json(genres)
})

module.exports = router;