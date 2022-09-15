const { Router } = require('express');

// Traigo las funciones necesarias
const { getGameDetail } = require('../utils/getGameDetail')

const router = Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  let detail = await getGameDetail(id)

  let statusCode
  detail.msgError ? statusCode = 400 : statusCode = 200

  res.status(statusCode).json(detail)
})

module.exports = router;