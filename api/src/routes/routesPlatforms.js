const { Router } = require('express');

// Traigo las funciones necesarias
const { getPlatforms } = require('../utils/getPlatforms')

const router = Router();

router.get('/', async (req, res) => {
  let platforms = await getPlatforms();

  let statusCode
  genres.msgError ? statusCode = 400 : statusCode = 200

  res.status(statusCode).json(platforms)
})

module.exports = router;