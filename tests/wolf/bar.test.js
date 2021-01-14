const qawolf = require("qawolf");
const { setupTestEnvironment } = require('../bdd/support/setup')

setupTestEnvironment()

test("bar", async () => {
  await qawolf.create("localhost:3000")
})