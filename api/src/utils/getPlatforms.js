require('dotenv').config();
const { Platform } = require('../db')
const { getGamesApi } = require('./getGames')

async function getPlatformsApi() {
  let infoGames = await getGamesApi();

  let platformsRepeated = []

  infoGames.forEach(e => {
    e.platforms.forEach(p => {
      platformsRepeated.push(p.name)
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

async function getPlatforms() {
  let platformsDb = await Platform.findAll();

  if (platformsDb.length === 0) {
    let toCreate = await getPlatformsApi()

    await Platform.bulkCreate(toCreate)
  }
}

module.exports = {
  getPlatformsApi,
  getPlatforms
}