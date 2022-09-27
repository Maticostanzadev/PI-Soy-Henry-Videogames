require('dotenv').config();
const { Platform } = require('../db')
const { getGamesApi } = require('./getGames')

async function getPlatformsApi() {
  try {
    let infoGames = await getGamesApi();

    let platformsRepeated = []

    infoGames.forEach(e => {
      e.platforms.forEach(p => {
        platformsRepeated.push(p.platform.name)
      })
    })


    let platforms = platformsRepeated.reduce((acc, item) => {
      if (!acc.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, []).map(p => {
      return {
        name: p
      }
    })

    return platforms
  }
  catch (e) {
    return { msgError: "Hubo un error al intentar obtener la información requerida" }
  }


}

async function getPlatforms() {
  let platformsDb = await Platform.findAll();

  if (platformsDb.length === 0) {
    let toCreate = await getPlatformsApi()

    await Platform.bulkCreate(toCreate)
    platformsDb = await Platform.findAll()
  }

  return platformsDb
}

module.exports = {
  getPlatformsApi,
  getPlatforms
}