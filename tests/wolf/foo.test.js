const qawolf = require("qawolf");
const { setupTestEnvironment } = require('../bdd/support/setup')

setupTestEnvironment()

test("foo", async () => {
  await qawolf.create("http://localhost:3000/")
})