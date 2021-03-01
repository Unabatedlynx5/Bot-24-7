const mineflayer = require('mineflayer')
const { pathfinder } = require('mineflayer-pathfinder')
const inventoryViewer = require('mineflayer-web-inventory')

const bot = mineflayer.createBot({
    host: 'Unabatedlynx5.aternos.me',
    port: 39138s,
    username: 'Unabatedbot',
})

function lookAtNearestPlayer () {
    const playerFilter = (entity) => entity.type === 'player'
    const playerEntity = bot.nearestEntity(playerFilter)
    
    if (!playerEntity) return

    const pos = playerEntity.position.offset(0, playerEntity.height, 0)
    bot.lookAt(pos)
}

bot.on('chat', function (username, message) {
    if (username === bot.username) return
    bot.chat(message)
  })

const mineflayerViewer = require('prismarine-viewer').mineflayer
bot.once('spawn', () => {
  mineflayerViewer(bot, { port: 3007, firstPerson: true })
})

bot.on('physicTick', lookAtNearestPlayer)
bot.loadPlugin(pathfinder)
inventoryViewer(bot)

/*function followPlayer() {
  const playerCI = bot.players('UnabatedLynx5')
  if (!playerCI) {
  bot.chat('UnabatedLynx5 is not online')
  }
}

bot.once('spawn', followPlayer)*/