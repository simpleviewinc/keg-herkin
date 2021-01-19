const qawolf = require('qawolf')
const { setupTestEnvironment } = require('../bdd/support/setup')

setupTestEnvironment()

test("$name", async () => {
  await qawolf.create("$url")
})